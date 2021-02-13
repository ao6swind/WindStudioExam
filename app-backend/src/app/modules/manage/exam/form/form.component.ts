import { Component, EventEmitter, OnInit } from '@angular/core';

import { ConfirmService } from './../../../../services/ui/confirm.service';
import { Exam } from 'lib-model';
import { ExamService } from './../../../../services/api/exam.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  onFormSave: EventEmitter<boolean> = new EventEmitter<boolean>();

  isCreateMode: boolean = true;

  exam: Exam = {
    title: null,
    url: null,
    sessions: []
  };

  constructor(
    private examService: ExamService,
    private confirm: ConfirmService
  ) { }

  ngOnInit() {}

  onBtnAddSessionClicked(): void {
    this.exam.sessions.push({
      examDate: null,
      registStart: null,
      registEnd: null
    });
  }

  onBtnRemoveSessionClicked(i: number): void {
    this.exam.sessions.splice(i, 1);
  }

  onBtnSaveClicked(): void {
    if(this.exam.sessions.length > 0) {
      switch(this.isCreateMode) {
        case true:
          this.examService.add(this.exam)
            .then((result) => {
              this.onFormSave.emit(true);
            }).catch((error) => {
              this.onFormSave.emit(false);
            });
          break;
        case false:
          this.examService.update(this.exam)
            .then((result) => {
              this.onFormSave.emit(true);
            }).catch((error) => {
              this.onFormSave.emit(false);
            });
          break;
      }
    } else {
      this.confirm.show({
        title: '資料驗證失敗',
        message: '梯次不可少於1個',
        hasCancel: false
      });
    }
  }
}
