import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { QuestionService } from './../../../../services/question.service';
import { QuestionSet } from 'lib-model';
import { ReportService } from './../../../../services/report.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  questionSet: QuestionSet = null;
  isShowAnswer: boolean[] = [];
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private reportService: ReportService
  ) { 
    this.route.params.subscribe((params) => {
      this.questionService.findFavor(params.id).subscribe((questionSet) => {
        this.questionSet = questionSet;
        // 初始化是否顯示答案的boolean陣列
        this.isShowAnswer = [];
        this.questionSet?.questions.forEach((question) => {
          this.isShowAnswer.push(false);
        });
      });
    });
  }

  ngOnInit() {
  }

  onBtnReportErrorClicked(item: IonItemSliding) {
    this.reportService.sendErrorRequest(this.questionSet.id);
    item.close();
  }

}
