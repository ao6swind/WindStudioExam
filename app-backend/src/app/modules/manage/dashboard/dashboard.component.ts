import { Component, OnInit } from '@angular/core';

import { QuestionService } from './../../../services/api/question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  questionCount: number = null;

  constructor(private questionService: QuestionService) { 
    this.questionService.count().subscribe((count) => {
      this.questionCount = count;
    });
  }

  ngOnInit() {}

}
