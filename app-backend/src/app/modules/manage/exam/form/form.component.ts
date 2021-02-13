import { Component, EventEmitter, OnInit } from '@angular/core';

import { Exam } from 'lib-model';
import { ExamService } from './../../../../services/api/exam.service';
import { PipesModule } from './../../../../share/pipes/pipes.module';

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

  constructor(private examService: ExamService) { }

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
    switch(this.isCreateMode) {
      case true:
        this.examService.add(this.exam);
        break;
      case false:
        this.examService.update(this.exam);
        break;
    }
  }
}
