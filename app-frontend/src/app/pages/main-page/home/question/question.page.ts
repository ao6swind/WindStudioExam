import { Component, OnInit } from '@angular/core';

import { QuestionService } from 'app-frontend/src/app/services/question.service';
import { QuestionSet } from 'lib-model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  isAutoSave: boolean = false;
  response: any = null;
  questionSet: QuestionSet = null;
  total = 0;
  current = 1;
  isShowAnswer: boolean[] = [];

  constructor(
    private questionService: QuestionService,
    public toastController: ToastController
  ) {
    // 先把狀態取出來 
    this.isAutoSave = localStorage.getItem('isAutoSaveQuestion')?.toUpperCase() === 'TRUE';
    this.response = localStorage.getItem('lastAutiSaveQuestionDoc');
    
    // 再去firebase撈資料
    this.questionService.count().subscribe((count) => {
      this.total = count;
    });
    this.query(0);
  }

  ngOnInit() {}

  /**
   * 記住進度
   * @param $event 
   */
  onAutoSaveChange($event) {
    localStorage.setItem('isAutoSaveQuestion', $event.detail.checked);
  }

  /**
   * 下一題
   */
  onBtnQueryNextClicked(): void {
    this.query(1);
  }

  /**
   * 上一題
   */
  onBtnQueryPreviousClicked(): void {
    this.query(-1);
  }

  /**
   * 查詢題目
   * @param direction 查詢方向, 1: 下一題, -1: 上一題, 0: 起點
   */
  private query(direction: number) {
    // 設置當前頁碼
    this.current += direction;

    this.questionService.list({ 
      direction,
      response: this.response
    }).subscribe((result) => {
      this.response = result[0]?.payload.doc;

      // 把查到的東西存到localStorage
      localStorage.setItem('lastAutiSaveQuestionDoc', (this.isAutoSave) ? this.response : null);
      
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
