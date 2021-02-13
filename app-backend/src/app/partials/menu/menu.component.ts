import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  isMenuOpen = true;
  menus: { 'title': string, 'url': string }[] = [
    { title: '測驗管理', url: '/exams' },
    { title: '連結管理', url: '/links' },
    { title: '標籤管理', url: '/tags' },
    { title: '題目管理', url: '/questions' },
  ];

  constructor() { }

  ngOnInit(): void {
    const isHide = document.body.classList.contains("hide-menu");
    const isOpen = document.body.classList.contains("open-menu");
    this.isMenuOpen = (!isHide && !isOpen) || isOpen;
  }

  onBtnTogglerClicked(): void {
    const isHide = document.body.classList.contains("hide-menu");
    const isOpen = document.body.classList.contains("open-menu");
    if((!isHide && !isOpen) || isOpen) {
      document.body.classList.remove("open-menu");
      document.body.classList.add("hide-menu");
      this.isMenuOpen = false;
    } else {
      document.body.classList.remove("hide-menu");
      document.body.classList.add("open-menu");
      this.isMenuOpen = true;
    }
  }

}
