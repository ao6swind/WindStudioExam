import { Component, EventEmitter, OnInit } from '@angular/core';

import { Tag } from 'lib-model';
import { TagService } from 'app-backend/src/app/services/api/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {

  onTagSelected: EventEmitter<string> = new EventEmitter<string>();

  tags: Tag[] = [];

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.list().subscribe((result) => {
      this.tags = result.map((actions) => { 
        const data = actions.payload.doc.data();
        const id = actions.payload.doc.id;
        return { id, ...data }; 
      });
    });
  }

  onTagClicked(tag: string): void {
    this.onTagSelected.emit(tag);
  }
}
