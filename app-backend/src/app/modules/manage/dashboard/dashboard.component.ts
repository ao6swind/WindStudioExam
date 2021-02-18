import 'firebase/storage';

import { Component, OnInit } from '@angular/core';

import { AlertLevel } from 'app-backend/src/app/share/enums/alert-level';
import { AlertService } from 'app-backend/src/app/services/ui/alert.service';
import { Config } from 'lib-model';
import { ConfigService } from './../../../services/api/config.service';
import { LinkService } from './../../../services/api/link.service';
import { QuestionService } from './../../../services/api/question.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  questionCount: number = null;
  linkCount: number = null;
  config: Config = null;

  constructor(
    private alert: AlertService,
    private questionService: QuestionService,
    private linkService: LinkService,
    private configService: ConfigService
  ) { 
    this.questionService.count().subscribe((count) => {
      this.questionCount = count;
    });
    this.linkService.count().subscribe((count) => {
      this.linkCount = count;
    });
    this.configService.get().subscribe((config) => {
      this.config = config;
    });
  }

  ngOnInit() {}

  onFileAndroidChange($event) {
    if($event.target.files.length > 0) {
      this.alert.show({ level: AlertLevel.Info, message: '上傳Android安裝檔中' });
      firebase.storage()
        .ref('files/android')
        .child('wind-studio-exam.apk')
        .put($event.target.files[0])
        .then((result) => {
          this.alert.show({ level: AlertLevel.Success, message: '上傳Android安裝檔成功' });
        })
        .catch((error) => {
          this.alert.show({ level: AlertLevel.Danger, message: '上傳Android安裝檔失敗' });
        });
    }
  }

  onBtnSaveConfig() {
    this.configService.update(this.config)
      .then(() => {
        this.alert.show({ level: AlertLevel.Success, message: '更新系統組態成功' });
      })
      .catch((error) => {
        this.alert.show({ level: AlertLevel.Danger, message: '更新系統組態失敗' });
      });
  }
}
