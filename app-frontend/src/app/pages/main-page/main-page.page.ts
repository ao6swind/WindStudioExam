import { Component, OnInit } from '@angular/core';

import { Link } from 'lib-model';
import { LinkService } from '../../services/link.service';
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

  constructor(
    private linkService: LinkService,
  ) { 
    this.isDarkMode = localStorage.getItem('darkMode')?.toUpperCase() === 'TRUE';
    this.setDarkMode();
  }

  ngOnInit() {
    this.linkService.list().subscribe((result) => {
      this.links = result.map((actions) => { 
        const data = actions.payload.doc.data();
        const id = actions.payload.doc.id;
        return { id, ...data }; 
      });
    });
  }

  onDarkModeChange($event) {
    localStorage.setItem('darkMode', $event.detail.checked);
    this.setDarkMode();
  }

  private setDarkMode() {
    document.body.classList.toggle('dark', this.isDarkMode);
  }
}
