import { Component, OnInit } from '@angular/core';

import { ConfirmService } from './../../../../services/ui/confirm.service';
import { QuestionService } from 'app-backend/src/app/services/api/question.service';
import { QuestionSet } from 'lib-model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  count: number = 500;
  questionSets: QuestionSet[] = [];

  constructor(
    private confirm: ConfirmService,
    private questionService: QuestionService
  ) { 
    
  }

  ngOnInit() {
    this.questionService.list(10, this.questionSets).subscribe((result) => {
      this.questionSets = result;
    });
  }

  onBtnRemoveQuestionClicked(id: string): void {
    this.confirm.show({
      title: '刪除題目',
      message: '此動作將會移除資料庫中的題目，你確定嗎？',
      confirmed: () => {
        this.questionService.delete(id);
      }
    });
  }

}
