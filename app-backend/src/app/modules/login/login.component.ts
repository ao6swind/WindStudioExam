import { Component, OnInit } from '@angular/core';

import { AlertLevel } from '../../share/enums/alert-level';
import { AlertService } from './../../services/ui/alert.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  account: string;
  password: string;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit() {}

  onBtnLoginClicked(): void {
    this.auth.signInWithEmailAndPassword(this.account, this.password)
      .then((result) => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.alert.show({ level: AlertLevel.Danger, message: '驗證失敗' })
      });
  }
}
