import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {

  isDarkMode: boolean = false;

  links = [
    { title: '台師大進修推廣學院Moodle', url: 'https://moodle.sce.ntnu.edu.tw', icon: 'link-outline' },
    { title: '高中生解題系統', url: 'https://zerojudge.tw', icon: 'link-outline' },
    { title: 'APCS官方網站', url: 'https://apcs.csie.ntnu.edu.tw/', icon: 'link-outline' }
  ]

  constructor() { }

  ngOnInit() {
  }

  onDarkModeChange($event) {
    document.body.classList.toggle('dark', $event.detail.checked);
  }
}
