import { Component, OnInit } from '@angular/core';

import { LinkService } from './../../../services/api/link.service';
import { QuestionService } from './../../../services/api/question.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  questionCount: number = null;
  linkCount: number = null;

  constructor(
    private questionService: QuestionService,
    private linkService: LinkService
  ) { 
    this.questionService.count().subscribe((count) => {
      this.questionCount = count;
    });
    this.linkService.count().subscribe((count) => {
      this.linkCount = count;
    });
  }

  ngOnInit() {}

}
