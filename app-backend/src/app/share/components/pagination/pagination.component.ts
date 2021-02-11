import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { PaginationService } from './../../../services/ui/pagination.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  @Input() total: number;
  @Input() url: string;

  lastPage = 1;
  sizes: number[] = [10, 20, 30];
  pageNumber = 1;
  pageSize = 10;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pagination: PaginationService
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  ngAfterContentChecked(): void {
    const subscription = this.route.params.subscribe((params) => {
      this.pageNumber = params.pageNumber ? params.pageNumber : this.pageNumber;
      this.pageSize = params.pageSize ? params.pageSize : this.pageSize;
      this.lastPage = Math.ceil(this.total / this.pagination.getPageSize());
      if (this.lastPage !== 0 && this.pageNumber > this.lastPage) {
        this.pageNumber = 1;
        this.routerNavigate();
      }
    });
    this.subscriptions.push(subscription);
  }

  onBtnNextClick(): void {
    if (+this.pageNumber + 1 <= this.lastPage) {
      this.pageNumber++;
      this.routerNavigate();
    }
  }

  onBtnPreviousClick(): void {
    if (this.pageNumber - 1 > 0) {
      this.pageNumber--;
      this.routerNavigate();
    }
  }

  isCurrentPage(page: number): boolean {
    return +this.pageNumber === page;
  }

  onBtnPageNumberClick(page: number): void {
    this.pageNumber = page;
    this.routerNavigate();
  }

  onPageSizeChange($event): void {
    this.pagination.setPageSize($event.target.value);
    this.routerNavigate();
  }

  onPageNumberChange($event): void {
    this.pageNumber = $event.target.value;
    this.routerNavigate();
  }

  private routerNavigate(): void {
    const subscription = this.route.queryParams.subscribe((params) => {
      window.scroll(0, 0);
      this.router.navigate([
        `${this.url}/${this.pageSize}/${this.pageNumber}`
      ], {queryParams: params});
    });
    this.subscriptions.push(subscription);
  }

}
