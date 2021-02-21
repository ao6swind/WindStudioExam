import { Component, HostListener, OnInit } from '@angular/core';
import { Config, Link } from 'lib-model';

import { ActionSheetController } from '@ionic/angular';
import { ConfigService } from '../../services/config.service';
import { LinkService } from '../../services/link.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  version = environment.version;
  isDarkMode: boolean = false;
  links: Link[] = [];
  config: Config = null;
  isHybrid = false;
  isHintShowed = true;
  promptEvent = null;
  
  constructor(
    private configService: ConfigService,
    private linkService: LinkService,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private platform: Platform
  ) { 
    this.isHybrid = this.platform.is('hybrid');
    this.isDarkMode = localStorage.getItem('darkMode')?.toUpperCase() === 'TRUE';
    this.setDarkMode();
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event) {
    event.preventDefault();
    this.isHintShowed = localStorage.getItem('isHintShowed')?.toLowerCase() === 'true';
    this.promptEvent = event;

    if(!this.isHybrid && !this.isHintShowed) {
      const actionSheet = this.actionSheetController.create({
        header: '此網站可安裝至桌面，你要安裝嗎？',
        buttons: [
          {
            text: '是',
            role: 'destructive',
            icon: 'checkmark',
            handler: () => {
              this.promptEvent.prompt();
            }
          }, 
          {
            text: '略過',
            icon: 'close',
            role: 'cancel',
            handler: () => { /* 什麼都不做 */ }
          }
        ]
      })
      actionSheet.then((a) => {
        localStorage.setItem('isHintShowed', 'true');
        a.present();
      });
    }
  }

  ngOnInit() {
    this.linkService.list().subscribe((result) => {
      this.links = result.map((actions) => { 
        const data = actions.payload.doc.data();
        const id = actions.payload.doc.id;
        return { id, ...data }; 
      });
    });

    this.configService.get().subscribe((config) => {
      this.config = config;
      if(this.isHybrid && this.config.version !== environment.version) {
        const actionSheet = this.actionSheetController.create({
          header: `有最新版本釋出(${this.config.version})，您要下載嗎？`,
          buttons: [
            {
              text: '是',
              role: 'destructive',
              icon: 'checkmark',
              handler: () => {
                window.location.href = environment.installer.android
              }
            }, 
            {
              text: '略過',
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
    });
  }

  onBtnInstallClicked() {
    if(this.promptEvent) {
      this.promptEvent.prompt();
    }
  }

  onDarkModeChange($event) {
    localStorage.setItem('darkMode', $event.detail.checked);
    this.setDarkMode();
  }

  onBtnReadTutorialClied() {
    this.router.navigate(['/tutorial']);
  }

  private setDarkMode() {
    document.body.classList.toggle('dark', this.isDarkMode);
  }
}
