import { Component, EventEmitter, OnInit } from '@angular/core';
import { Link, LinkIcon } from 'lib-model';

import { LinkService } from './../../../../services/api/link.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  isCreateMode: boolean = true;

  onFormSave: EventEmitter<boolean> = new EventEmitter<boolean>();

  link: Link = {
    title: null,
    url: null,
    icon: null
  };

  icons = LinkIcon;

  constructor(private linkService: LinkService) { }

  ngOnInit() {}

  onBtnSaveClicked(): void {
    switch(this.isCreateMode) {
      case true:
        this.linkService.add(this.link).then((result) => {
          this.onFormSave.emit(true);
        }).catch((error) => {
          this.onFormSave.emit(false);
        });
        break;
      case false:
        this.linkService.update(this.link).then((result) => {
          this.onFormSave.emit(true);
        }).catch((error) => {
          this.onFormSave.emit(false);
        });
        break;
    }
  }
}
