import { CanLoad, Route, Router, UrlSegment } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) {
    
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.isLoggedIn().then((value) => {
        if (value) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      });
  }

  private isLoggedIn() {
    return this.auth.authState.pipe(first()).toPromise();
  }
}
