import { ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadTutorialGuard implements CanLoad {

  constructor(private router: Router) {
    
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    
    const isReadTutorial = localStorage.getItem('isReadTutorial') === 'true';
    
    if(!isReadTutorial) {
      this.router.navigate(['/tutorial']);
    } else {
      return isReadTutorial;
    }
  }
}
