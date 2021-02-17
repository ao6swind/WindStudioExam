import 'firebase/storage';

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AlertLevel } from 'app-backend/src/app/share/enums/alert-level';
import { AlertService } from './../../../../services/ui/alert.service';
import { ConfirmService } from './../../../../services/ui/confirm.service';
import { QuestionService } from 'app-backend/src/app/services/api/question.service';
import { QuestionSet } from 'lib-model';
import firebase from 'firebase/app';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  count: number = 0;
  questionSets: QuestionSet[] = [];
  pageSize: number;
  pageNumber: number;
  responseLast: any;
  responseFirst: any;

  constructor(
    private alert: AlertService,
    private confirm: ConfirmService,
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe((params) => {
      if(params.pageSize !== this.pageSize) {
        this.responseFirst = null;
        this.responseLast = null;
      } else {
        if(params.pageNumber === 1) {
          this.responseFirst = null;
          this.responseLast = null;
        } else {
          if(this.pageNumber > params.pageNumber) {
            this.responseLast = null;
          }
          if(this.pageNumber < params.pageNumber) {
            this.responseFirst = null;
          }
        }
      }

      this.pageSize = params.pageSize;
      this.pageNumber = params.pageNumber;

      this.questionService.list({
        pageSize: this.pageSize,
        responseFirst: this.responseFirst,
        responseLast: this.responseLast
      }).subscribe((result) => {
        this.responseFirst = result[0]?.payload.doc;
        this.responseLast = result[this.pageSize - 1]?.payload.doc;
        this.questionSets = result.map((actions) => { 
          const data = actions.payload.doc.data();
          const id = actions.payload.doc.id;
          return { id, ...data }; 
        });
      });

      this.questionService.count().subscribe((count) => {
        this.count = count;
      });
    });
  }

  ngOnInit() {
    
  }

  onBtnRemoveQuestionClicked(questionSet: QuestionSet): void {
    this.confirm.show({
      title: '刪除題目',
      message: '此動作將會移除資料庫中的題目，你確定嗎？',
      confirmed: () => {
        this.questionService.delete(questionSet.id)
          .then(() => {
            firebase.storage().ref(`question/${questionSet.folder}`).listAll().then((folder) => {
              folder.items.forEach((file) => {
                file.delete();
              });
            });
            this.alert.show({ level: AlertLevel.Success, message: '刪除題目成功' })
          })
          .catch((error) => {
            this.alert.show({ level: AlertLevel.Success, message: '刪除題目失敗' })
          });
      }
    });
  }

}
