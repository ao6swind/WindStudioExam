import { Component, EventEmitter, OnInit } from '@angular/core';

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
  
  count: number = 0;
  tags: Tag[] = [];

  constructor(
    private drawer: DrawerService,
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.tagService.list().subscribe((tags) => {
      this.tags = tags;
    });

    this.addTagHandler.subscribe((tags: Tag[]) => {
      new Promise<void>((resolve) => {
        tags.forEach((tag, i) => {
          this.tagService.add(tag).then(() => {
            console.log(`add tag success (${i})`, tag);
          });
        });
        resolve()
      }).then(() => {
        this.drawer.hide();
      });
    });

    this.updateTagHandler.subscribe((tags: Tag[]) => {
      new Promise<void>((resolve) => {
        tags.forEach((tag, i) => {
          this.tagService.update(tag).then(() => {
            console.log(`update tag success (${i})`, tag);
          });
        });
        resolve()
      }).then(() => {
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
