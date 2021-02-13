import { Component, EventEmitter, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AlertLevel } from 'app-backend/src/app/share/enums/alert-level';
import { AlertService } from './../../../../services/ui/alert.service';
import { ConfirmService } from './../../../../services/ui/confirm.service';
import { DrawerService } from './../../../../services/ui/drawer.service';
import { Exam } from 'lib-model';
import { ExamService } from './../../../../services/api/exam.service';
import { FormComponent } from './../form/form.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  addExamHandler: EventEmitter<boolean> = new EventEmitter<boolean>();
  updateExamHandler: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  count: number = 0;
  exams: Exam[] = [];
  pageSize: number;
  pageNumber: number;
  responseLast: any;
  responseFirst: any;

  constructor(
    private alert: AlertService,
    private confirm: ConfirmService,
    private drawer: DrawerService,
    private examService: ExamService,
    private route: ActivatedRoute
  ) { 
    this.addExamHandler.subscribe((isSuccess) => {
      if(isSuccess) {
        this.alert.show({ level: AlertLevel.Success, message: '新增連結成功'});
        this.drawer.hide();
      } else {
        this.alert.show({ level: AlertLevel.Danger, message: '新增連結失敗'});
      }
    });

    this.updateExamHandler.subscribe((isSuccess) => {
      if(isSuccess) {
        this.alert.show({ level: AlertLevel.Success, message: '修改連結成功'});
        this.drawer.hide();
      } else {
        this.alert.show({ level: AlertLevel.Danger, message: '修改連結失敗'});
      }
    });
  }

  ngOnInit() { 
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

      this.examService.list({
        pageSize: this.pageSize,
        responseFirst: this.responseFirst,
        responseLast: this.responseLast
      }).subscribe((result) => {
        this.responseFirst = result[0]?.payload.doc;
        this.responseLast = result[this.pageSize - 1]?.payload.doc;
        this.exams = result.map((actions) => { 
          const data = actions.payload.doc.data();
          const id = actions.payload.doc.id;
          return { id, ...data }; 
        });
      });

      this.examService.count().subscribe((count) => {
        this.count = count;
      });
    });
  }

  onBtnAddExamClicked(): void {
    this.drawer.show({
      title: '新增測驗',
      component: FormComponent,
      data: [
        { key: 'isCreateMode', value: true }
      ],
      events: [
        { key: 'onFormSave', handler: this.addExamHandler }
      ]
    });
  }

  onBtnUpdateExamClicked(exam: Exam): void {
    this.drawer.show({
      title: '修改測驗',
      component: FormComponent,
      data: [
        { key: 'isCreateMode', value: false },
        { key: 'exam', value: exam }
      ],
      events: [
        { key: 'onFormSave', handler: this.updateExamHandler }
      ]
    });
  }

  onBtnRemoveExamClicked(id: string): void {
    this.confirm.show({
      title: '刪除測驗',
      message: '此動作將會刪除測驗，確定刪除？',
      confirmed: () => {
        this.examService.delete(id)
          .then(() => {
            this.alert.show({ level: AlertLevel.Success, message: '刪除測驗成功' });
          })
          .catch((error) => {
            this.alert.show({ level: AlertLevel.Danger, message: '刪除測驗失敗' });
          });
      }
    })
  }

}
