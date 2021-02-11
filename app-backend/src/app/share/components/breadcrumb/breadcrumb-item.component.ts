import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-item',
  templateUrl: './breadcrumb-item.component.html',
  styleUrls: ['./breadcrumb-item.component.scss'],
})
export class BreadcrumbItemComponent implements OnInit {

  @Input() url: string;
  @HostBinding('class') classes = 'breadcrumb-item';

  constructor() { }

  ngOnInit() {}

}
