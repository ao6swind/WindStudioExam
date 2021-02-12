import { Component, EventEmitter, OnInit } from '@angular/core';

import { Tag } from 'lib-model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  onFormSave: EventEmitter<Tag[]> = new EventEmitter<Tag[]>();
  
  tagString: string;
  level: number;
  level1Tag: Tag = null;
  level2Tag: Tag = null;

  constructor() { }

  ngOnInit() {}

  onBtnSaveClicked(): void {
    const tagStringList: string[] = this.tagString.split('\n');
    const tags: Tag[] = [];
    switch(this.level) {
      case 1:
        tagStringList.forEach((tagString) => {
          if(tagString && tags.findIndex(tag => tag.text === tagString) === -1) {
            tags.push({
              level: this.level,
              text: tagString,
              tags: []
            });
          }
        });
        break;
      case 2:
        tagStringList.forEach((tagString) => {
          if(tagString && this.level1Tag.tags.findIndex(tag => tag.text === tagString) === -1) {
            this.level1Tag.tags.push({
              level: this.level,
              text: tagString,
              tags: []
            });
          }
        });
        tags.push(this.level1Tag);
        break;
      case 3:
        const index = this.level1Tag.tags.findIndex((tag) => tag.text === this.level2Tag.text);
        tagStringList.forEach((tagString) => {
          if(tagString && this.level2Tag.tags.findIndex(tag => tag.text === tagString) === -1) {
            this.level2Tag.tags.push({
              level: this.level,
              text: tagString
            });
          }
        });
        this.level1Tag.tags[index] = this.level2Tag;
        tags.push(this.level1Tag);
        break;
    }
    this.onFormSave.emit(tags);
  }
}
