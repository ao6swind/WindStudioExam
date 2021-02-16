import { Component, OnInit } from '@angular/core';

import { Exam } from 'lib-model';
import { ExamService } from '../../../../services/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
})
export class ExamPage implements OnInit {

  exams: Exam[] = [];

  constructor(private examService: ExamService) { }

  ngOnInit() {
    this.examService.list().subscribe((result) => {
      this.exams = result.map((actions) => { 
        const data = actions.payload.doc.data();
        const id = actions.payload.doc.id;
        return { id, ...data }; 
      });
    });
  }

}
