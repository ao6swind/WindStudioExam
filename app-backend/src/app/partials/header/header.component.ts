import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  onBtnTogglerClicked(): void {
    const isHide = document.body.classList.contains("hide-menu");
    const isOpen = document.body.classList.contains("open-menu");
    if((!isHide && !isOpen) || isHide) {
      document.body.classList.remove("hide-menu");
      document.body.classList.add("open-menu");
    } else {
      document.body.classList.remove("open-menu");
      document.body.classList.add("hide-menu");
    }
  }
}
