import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from 'lib-model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  list() {
    if(environment.useFirebase) {

    } else {
      return this.http.get<Tag[]>(`${environment.host}/${environment.api.tag.list}`);
    }
  }
}
