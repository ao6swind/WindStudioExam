import { Component, EventEmitter, OnInit } from '@angular/core';

import { AlertLevel } from 'app-backend/src/app/share/enums/alert-level';
import { AlertService } from './../../../../services/ui/alert.service';
import { DrawerService } from './../../../../services/ui/drawer.service';
import { FormComponent } from './../form/form.component';
import { Tag } from 'lib-model';
import { TagService } from 'app-backend/src/app/services/api/tag.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  
  addTagHandler: EventEmitter<Tag[]> = new EventEmitter<Tag[]>();
  updateTagHandler: EventEmitter<Tag[]> = new EventEmitter<Tag[]>();
  
  tags: Tag[] = [];

  constructor(
    private alert: AlertService,
    private drawer: DrawerService,
    private tagService: TagService,
  ) { }

  ngOnInit() {
    this.tagService.list().subscribe((result) => {
      this.tags = result.map((actions) => { 
        const data = actions.payload.doc.data();
        const id = actions.payload.doc.id;
        return { id, ...data }; 
      });
    });

    this.addTagHandler.subscribe((tags: Tag[]) => {
      const errors: { tag: Tag, error: any }[] = [];
      new Promise<void>((resolve) => {
        tags.forEach((tag, i) => {
          this.tagService.add(tag)
            .catch((error) => {
              errors.push({ tag, error });
            });
        });
        resolve()
      }).then(() => {
        if(errors.length === 0) {
          this.alert.show({ level: AlertLevel.Success, message: '新增標籤成功' });
        } else {
          this.alert.show({ level: AlertLevel.Danger, message: '新增標籤失敗' });
        }
        this.drawer.hide();
      });
    });

    this.updateTagHandler.subscribe((tags: Tag[]) => {
      const errors: { tag: Tag, error: any }[] = [];
      new Promise<void>((resolve) => {
        tags.forEach((tag, i) => {
          this.tagService.update(tag)
            .catch((error) => {
              errors.push({ tag, error });
            });
        });
        resolve()
      }).then(() => {
        if(errors.length === 0) {
          this.alert.show({ level: AlertLevel.Success, message: '更新標籤成功' });
        } else {
          this.alert.show({ level: AlertLevel.Danger, message: '更新標籤失敗' });
        }
        this.drawer.hide();
      });
    });
  }

  onBtnAddTagClicked(level: number, level1Tag: Tag = null, level2Tag: Tag = null): void {
    this.drawer.show({
      title: `新增標籤(階層${level})`,
      component: FormComponent,
      data: [
        { key: 'level', value: level },
        { key: 'level1Tag', value: level1Tag },
        { key: 'level2Tag', value: level2Tag }
      ],
      events: [
        { key: 'onFormSave', handler: (level === 1) ? this.addTagHandler : this.updateTagHandler }
      ]
    });
  }

  onBtnRemoveTagClicked(level: number, i: number, j: number = null, k: number = null) {
    switch(level) {
      case 1:
        this.tagService.delete(this.tags[i].id);
        break;
      case 2:
        this.tags[i].tags.splice(j, 1);
        this.tagService.update(this.tags[i]);
        break;
      case 3:
        this.tags[i].tags[j].tags.splice(k, 1);
        this.tagService.update(this.tags[i]);
        break;
    }
  }
}
