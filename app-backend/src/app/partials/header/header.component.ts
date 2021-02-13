import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  user: string;

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { 
    this.auth.user.subscribe((user) => {
      this.user = user.displayName;
    });
  }

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

  onBtnLogoutClicked(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
