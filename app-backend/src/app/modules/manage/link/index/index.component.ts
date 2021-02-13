import { Component, EventEmitter, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AlertLevel } from 'app-backend/src/app/share/enums/alert-level';
import { AlertService } from './../../../../services/ui/alert.service';
import { ConfirmService } from './../../../../services/ui/confirm.service';
import { DrawerService } from './../../../../services/ui/drawer.service';
import { FormComponent } from './../form/form.component';
import { Link } from 'lib-model';
import { LinkService } from './../../../../services/api/link.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  addLinkHandler: EventEmitter<boolean> = new EventEmitter<boolean>();
  updateLinkHandler: EventEmitter<boolean> = new EventEmitter<boolean>();

  count: number = 0;
  links: Link[] = [];
  pageSize: number;
  pageNumber: number;
  responseLast: any;
  responseFirst: any;

  constructor(
    private alert: AlertService,
    private confirm: ConfirmService,
    private drawer: DrawerService, 
    private linkService: LinkService,
    private route: ActivatedRoute
  ) { 
    this.addLinkHandler.subscribe((isSuccess) => {
      if(isSuccess) {
        this.alert.show({ level: AlertLevel.Success, message: '新增連結成功'});
        this.drawer.hide();
      } else {
        this.alert.show({ level: AlertLevel.Danger, message: '新增連結失敗'});
      }
    });

    this.updateLinkHandler.subscribe((isSuccess) => {
      if(isSuccess) {
        this.alert.show({ level: AlertLevel.Success, message: '修改連結成功'});
        this.drawer.hide();
      } else {
        this.alert.show({ level: AlertLevel.Danger, message: '修改連結失敗'});
      }
    });

    this.route.params.subscribe((params) => {
      if(params.pageSize !== this.pageSize) {
        this.responseFirst = null;
        this.responseLast = null;
      } else {
        if(params.pageNumber === 1) {
          this.responseFirst = null;
          this.responseLast = null;
        } else {
          if(this.pageNumber > params.pageNumber) {
            this.responseLast = null;
          }
          if(this.pageNumber < params.pageNumber) {
            this.responseFirst = null;
          }
        }
      }

      this.pageSize = params.pageSize;
      this.pageNumber = params.pageNumber;

      this.linkService.list({
        pageSize: this.pageSize,
        responseFirst: this.responseFirst,
        responseLast: this.responseLast
      }).subscribe((result) => {
        this.responseFirst = result[0]?.payload.doc;
        this.responseLast = result[this.pageSize - 1]?.payload.doc;
        this.links = result.map((actions) => { 
          const data = actions.payload.doc.data();
          const id = actions.payload.doc.id;
          return { id, ...data }; 
        });
      });

      this.linkService.count().subscribe((count) => {
        this.count = count;
      });
    });
  }

  ngOnInit() {}

  onBtnAddLinkClicked(): void {
    this.drawer.show({
      title: '新增連結',
      component: FormComponent,
      data: [
        { key: 'isCreateMode', value: true }
      ],
      events: [
        { key: 'onFormSave', handler: this.addLinkHandler }
      ]
    });
  }

  onBtnUpdateLinkClicked(link: Link): void {
    this.drawer.show({
      title: '編輯連結',
      component: FormComponent,
      data: [
        { key: 'isCreateMode', value: false },
        { key: 'link', value: link }
      ],
      events: [
        { key: 'onFormSave', handler: this.updateLinkHandler }
      ]
    });
  }

  onBtnRemoveLinkClicked(id: string): void {
    this.confirm.show({
      title: '刪除連結',
      message: '此動作將會刪除連結，確定刪除？',
      confirmed: () => {
        this.linkService.delete(id)
          .then(() => {
            this.alert.show({ level: AlertLevel.Success, message: '刪除連結成功' });
          })
          .catch((error) => {
            this.alert.show({ level: AlertLevel.Danger, message: '刪除連結失敗' });
          });
      }
    })
  }
}
