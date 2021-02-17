import 'firebase/storage';

import { Component, OnInit } from '@angular/core';

import { AlertLevel } from 'app-backend/src/app/share/enums/alert-level';
import { AlertService } from './../../../../services/ui/alert.service';
import { ConfirmService } from './../../../../services/ui/confirm.service';
import firebase from 'firebase/app';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
})
export class ResourceComponent implements OnInit {

  folder: string;
  resources: { name: string, type: string, url: string }[] = [];
  preview: { name: string, type: string, url: string } = null;
  
  constructor(
    private alert: AlertService,
    private confirm: ConfirmService
  ) { 
    
  }

  ngOnInit() {
    firebase.storage().ref(this.folder).listAll().then((folder) => {
      folder.items.forEach((file) => {
        forkJoin([
          file.getMetadata(),
          file.getDownloadURL()
        ]).subscribe(([metadata, url]) => {
          this.resources.push({ 
            name: file.name, 
            type: metadata.contentType,
            url 
          });
        });
      });
    });
  }

  onBtnRemoveResourceClicked(filename: string) {
    this.confirm.show({
      title: '刪除資源',
      message: '移除這個資源可能會導致題目內使用到的資源參考失效，你確定嗎？',
      confirmed: () => {
        firebase.storage().ref(this.folder).child(filename)
          .delete()
          .then((result) => {
            const index = this.resources.findIndex((resource) => { resource.name === filename });
            this.resources.splice(index, 1);
            if(this.preview.name === filename) {
              this.preview = null;
            }
            this.alert.show({ level: AlertLevel.Success, message: '刪除資源成功' });
          })
          .catch((error) => {
            this.alert.show({ level: AlertLevel.Danger, message: '刪除資源失敗' });
          });
      }
    })
  }

  onBtnPreviewClicked(resource: { name: string, type: string, url: string }): void {
    this.preview = resource;
  }

  getResourceType(): string {
    if(this.preview.type.toLowerCase().indexOf('image') > -1) {
      return 'image';
    } else if(this.preview.type.toLowerCase().indexOf('video') > -1) {
      return 'video';
    } else if(this.preview.type.toLowerCase().indexOf('audio') > -1) {
      return 'audio';
    } else {
      return 'file';
    }
  }
}
