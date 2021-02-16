import { Component, OnInit } from '@angular/core';
import { QuestionSet, Tag } from 'lib-model';

import { QuestionService } from '../../../../services/question.service';
import { TagService } from '../../../../services/tag.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  response: any = null;
  tags: Tag[] = [];
  topics: string[] = [];
  type: string = 'AND';
  questionSet: QuestionSet = null;
  total = 0;
  current = 1;
  isShowAnswer: boolean[] = [];

  constructor(
    private tagService: TagService,
    private questionService: QuestionService,
    public toastController: ToastController
  ) { 
    this.tagService.list().subscribe((result) => {
      this.tags = result.map((actions) => { 
        const data = actions.payload.doc.data();
        const id = actions.payload.doc.id;
        return { id, ...data }; 
      });
    });
  }

  ngOnInit() {
  
  }

  onBtnAddTopicClicked(topic: string): void {
    const index = this.topics.indexOf(topic);
    if(index === -1) {
      this.topics.push(topic);
    } else {
      this.topics.splice(index, 1);
    }
  }

  onBtnQueryClicked(): void {
    this.questionService.countWithTopic({
      topics: this.topics,
      type: this.type
    }).subscribe((count) => {
      this.total = count;
    });
    this.queryWithTopic(0);
  }

  onBtnQueryNextClicked(): void {
    this.queryWithTopic(1);
  }

  onBtnQueryPreviousClicked(): void {
    this.queryWithTopic(-1);
  }

  onBtnShowAnswerClicked(i: number): void {
    this.isShowAnswer[i] = !this.isShowAnswer[i];
  }

  private queryWithTopic(direction: number) {
    this.current += direction;

    this.questionService.listWithTopic({ 
      direction,
      type: this.type,
      topics: this.topics,
      response: this.response
    }).subscribe((result) => {
      this.response = result[0]?.payload.doc;
      this.questionSet = result.map((actions) => { 
        const data = actions.payload.doc.data();
        const id = actions.payload.doc.id;
        return { id, ...data }; 
      })[0];

      this.isShowAnswer = [];
      this.questionSet?.questions.forEach((question) => {
        this.isShowAnswer.push(false);
      });

      if(!this.questionSet) {
        const toast = this.toastController.create({
          message: '查無資料',
          duration: 3000,
          color: 'danger'
        });
        toast.then((t) => {
          t.present();
        });
      }
    });
  }
}
