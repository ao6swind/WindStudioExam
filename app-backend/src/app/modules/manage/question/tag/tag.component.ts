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
    this.tagService.list().subscribe((tags) => {
      this.tags = tags;
    });
  }

  onTagClicked(tag: string): void {
    this.onTagSelected.emit(tag);
  }
}
