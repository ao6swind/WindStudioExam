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

  isAutoSave: boolean = false;
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
    // 先把狀態取出來 
    this.isAutoSave = localStorage.getItem('isAutoSaveFilter')?.toUpperCase() === 'TRUE';
    this.response = localStorage.getItem('lastAutiSaveFilterDoc');

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
    localStorage.setItem('isAutoSaveFilter', $event.detail.checked);
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

    this.questionService.listWithTopic({ 
      direction,
      type: this.type,
      topics: this.topics,
      response: this.response
    }).subscribe((result) => {
      this.response = result[0]?.payload.doc;

      // 把查到的東西存到localStorage
      localStorage.setItem('lastAutiSaveFilterDoc', (this.isAutoSave) ? this.response : null);
      
      this.questionSet = result.map((actions) => { 
        const data = actions.payload.doc.data();
        const id = actions.payload.doc.id;
        return { id, ...data }; 
      })[0];

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
