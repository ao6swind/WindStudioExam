import * as CKEDITOR from './../../../../../assets/ckeditor/ckeditor.js';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { QuestionSet, QuestionType } from 'lib-model';

import { AlertLevel } from 'app-backend/src/app/share/enums/alert-level.js';
import { AlertService } from './../../../../services/ui/alert.service';
import { CkeditorUploadAdapter } from './../../../../share/utilities/ckeditor-upload-adaptor';
import { ConfirmService } from './../../../../services/ui/confirm.service';
import { DrawerService } from './../../../../services/ui/drawer.service';
import { QuestionService } from './../../../../services/api/question.service';
import { ResourceComponent } from './../resource/resource.component';
import { TagComponent } from './../tag/tag.component';

declare const $: any;
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  isCreateMode = true;

  classicEditor = CKEDITOR.ClassicEditor;
  inlineEditor = CKEDITOR.InlineEditor;

  onTagSelectedHandler: EventEmitter<string> = new EventEmitter<string>();

  questionTypeEnum = QuestionType;
  
  questionSet: QuestionSet = {
    source: null,
    url: null,
    content: null,
    tags: [ ],
    folder: Date.now().toString(),
    questions: [ ],
    createdAt: null,
    updatedAt: null,
  };

  constructor(
    private questionService: QuestionService, 
    private alert: AlertService,
    private confirm: ConfirmService,
    private drawer: DrawerService, 
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.onTagSelectedHandler.subscribe((tag) => {
      if(this.questionSet.tags.indexOf(tag) < 0) {
        this.questionSet.tags.push(tag);
      }
    });

    this.isCreateMode = this.route.routeConfig.path === 'create';

    if(!this.isCreateMode) {
      this.route.params.subscribe((params) => {
        this.questionService.get(params.id).subscribe((result) => {
          this.questionSet = result;
        });
      });
    }
  }

  ngOnInit() { }

  /**
   * 新增子題
   */
  onBtnAddQuestionClicked(): void {
    this.questionSet.questions.push({
      content: null,
      type: null,
      options: [],
      comment: null
    })
  }

  /**
   * 顯示已上傳的資源檔案
   */
  onBtnListResourceClicked(): void {
    this.drawer.show({
      title: '管理資源',
      component: ResourceComponent,
      data: [
        { key: 'folder', value: this.questionSet.folder }
      ]
    });
  }

  /**
   * 新增標籤
   */
  onBtnAddTagClicked(): void {
    this.drawer.show({
      title: '選取標籤',
      component: TagComponent,
      events: [
        { key: 'onTagSelected', handler: this.onTagSelectedHandler }
      ]
    });
  }

  /**
   * 移除標籤
   * @param tag 標籤內文 
   */
  onBtnRemoveTagClick(tag: string): void {
    const index = this.questionSet.tags.indexOf(tag);
    this.questionSet.tags.splice(index, 1);
  }



  /**
   * 移除子題
   * @param i 子題索引
   */
  onBtnRemoveQuestionClicked(i: number): void {
    this.confirm.show({
      title: `移除第${i+1}題`,
      message: `此動作將會移除第${i+1}題，你確定嗎？`,
      confirmed: () => {
        this.questionSet.questions.splice(i, 1);
        $(`.tab-pane:first`).tab('show');
        $(`.nav-link:first`).addClass('active');
      }
    })
  }

  /**
   * 當子題的類型改變時
   * @param i 子題索引
   */
  onQuestionTypeChanged(i: number): void {
    this.questionSet.questions[i].options = [];
  }

  /**
   * 增加選項
   * @param i 子題索引
   */
  onBtnAddOptionClicked(i: number): void {
    this.questionSet.questions[i].options.push({
      isAnswer: false,
      content: null
    });
  }

  /**
   * 移除選項
   * @param i 子題索引
   * @param j 選項索引
   */
  onBtnRemoveOptionClicked(i, j): void {
    this.confirm.show({
      title: `移除第${i+1}題的選項${j+1}`,
      message: `此動作將會移除第${i+1}題的選項${j+1}，你確定嗎？`,
      confirmed: () => {
        this.questionSet.questions[i].options.splice(j, 1);
      }
    });
  }
  
  /**
   * 單選題設置正確答案
   * @param i 子題索引
   * @param j 選項索引
   */
  onOptionIsAnswerClicked(i, j): void {
    this.questionSet.questions[i].options.forEach((option, index) => {
      option.isAnswer = j == index;
    });
  }

  /**
   * 當點擊存檔時
   */
  onBtnSaveClicked(): void {
    if(this.questionSet.questions.length > 0) {
      switch(this.isCreateMode) {
        case true:
          this.questionSet.createdAt = Date.now();
          this.questionService.add(this.questionSet)
            .then(() => {
              this.alert.show({ level: AlertLevel.Success, message: '新增題目成功' });
              this.router.navigate(['/questions']);
            })
            .catch((error) => {
              this.alert.show({ level: AlertLevel.Danger, message: '新增題目失敗' });
            });
          break;
        case false:
          this.questionSet.updatedAt = Date.now();
          this.questionService.update(this.questionSet)
            .then(() => {
              this.alert.show({ level: AlertLevel.Success, message: '更新題目成功' });
              this.router.navigate(['/questions']);
            })
            .catch((error) => {
              this.alert.show({ level: AlertLevel.Danger, message: '更新題目失敗' });
            });
          break;
      }
    } else {
      this.confirm.show({
        title: '資料驗證失敗',
        message: '子題數量不可少於1題',
        hasCancel: false
      });
    }
  }

  onEditorReady($event) {
    $event.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new CkeditorUploadAdapter(loader, this.questionSet.folder);
    };
  }
}
