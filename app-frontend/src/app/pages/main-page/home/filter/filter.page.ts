import { ActionSheetController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { QuestionSet, Tag } from 'lib-model';

import { QuestionService } from '../../../../services/question.service';
import { TagService } from '../../../../services/tag.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  isAutoSave: boolean = false;
  response: any = null;
  tags: Tag[] = [];
  topics: string[] = [];
  type: string = 'OR';
  questionSet: QuestionSet = null;
  total = 0;
  current = 1;
  isShowAnswer: boolean[] = [];

  constructor(
    private tagService: TagService,
    private questionService: QuestionService,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController
  ) { 
    // 先把狀態取出來 
    this.isAutoSave = localStorage.getItem('filterIsAutoSave')?.toUpperCase() === 'TRUE';
    if(this.isAutoSave) {
      if(!(this.current = +localStorage.getItem('filterCurrent'))) {
        this.current = 1;
      }
      if(!(this.topics = JSON.parse(localStorage.getItem('filterTopics')))) {
        this.topics = [];
      }
    }


    // 再取出全部的tag讓user來做篩選
    this.tagService.list().subscribe((result) => {
      this.tags = result.map((actions) => { 
        const data = actions.payload.doc.data();
        const id = actions.payload.doc.id;
        return { id, ...data }; 
      });
    });
  }

  ngOnInit() {}

  /**
   * 記住進度
   * @param $event 
   */
  onAutoSaveChange($event) {
    localStorage.setItem('filterIsAutoSave', $event.detail.checked);
    localStorage.setItem('filterLastDoc', ($event.detail.checked) ? this.questionSet.id : null);
    localStorage.setItem('filterCurrent', this.current.toString());
    localStorage.setItem('filterTopics', JSON.stringify(this.topics));
  }

  /**
   * 當user選擇tag後放到topics字串陣列作為查詢條件,
   * 如果已經存在於topics就移除該字串
   * @param topic tag文字
   */
  onBtnAddTopicClicked(topic: string): void {
    const index = this.topics.indexOf(topic);
    if(index === -1) {
      this.topics.push(topic);
    } else {
      this.topics.splice(index, 1);
    }
  }

  /**
   * 點擊開始查詢後
   */
  onBtnQueryClicked(): void {
    this.questionService.countWithTopic({
      topics: this.topics,
      type: this.type
    }).subscribe((count) => {
      this.total = count;
    });
    this.queryWithTopic(0);
  }

  /**
   * 
   */
  onBtnResetClicked(): void {
    const actionSheet = this.actionSheetController.create({
      header: '這個動作將忘記上次進度，確定要重新查詢嗎？',
      buttons: [
        {
          text: '確定',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.isAutoSave = false;
            this.current = 1;
            this.topics = [];
            localStorage.setItem('filterIsAutoSave', this.isAutoSave.toString());
            localStorage.setItem('filterLastDoc', null);
            localStorage.setItem('filterCurrent', null);
            localStorage.setItem('filterTopics', null);
          }
        }, 
        {
          text: '取消',
          icon: 'close',
          role: 'cancel',
          handler: () => { /* 什麼都不做 */ }
        }
      ]
    })
    actionSheet.then((a) => {
      a.present();
    });
  }

  /**
   * 下一題
   */
  onBtnQueryNextClicked(): void {
    this.queryWithTopic(1);
  }

  /**
   * 上一題
   */
  onBtnQueryPreviousClicked(): void {
    this.queryWithTopic(-1);
  }

  /**
   * 顯示答案
   * @param i 子題索引
   */
  onBtnShowAnswerClicked(i: number): void {
    this.isShowAnswer[i] = !this.isShowAnswer[i];
  }

  /**
   * 查詢題目
   * @param direction 查詢方向, 1: 下一題, -1: 上一題, 0: 起點
   */
  private queryWithTopic(direction: number) {
    // 設置當前頁碼
    this.current += direction;
    localStorage.setItem('filterCurrent', this.current.toString());

    if(this.isAutoSave && direction === 0) {
      this.questionService.get(localStorage.getItem('filterLastDoc'))
        .subscribe((result) => {
          this.response = result.payload;
          const data = result.payload.data();
          const id = result.payload.id;
          this.questionSet = { id, ...data };
        });
    } else {
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

        // 把查到的東西存到localStorage
        localStorage.setItem('filterLastDoc', (this.isAutoSave) ? this.questionSet.id : null);    
        localStorage.setItem('filterCurrent', (this.isAutoSave) ? this.current.toString() : null);
        localStorage.setItem('filterTopics', (this.isAutoSave) ? JSON.stringify(this.topics) : null);
        
        // 初始化是否顯示答案的boolean陣列
        this.isShowAnswer = [];
        this.questionSet?.questions.forEach((question) => {
          this.isShowAnswer.push(false);
        });

        // 如果沒有找到資料就彈出toast提示user
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
}
