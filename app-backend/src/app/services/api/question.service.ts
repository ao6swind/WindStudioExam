import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionSet } from 'lib-model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  list() {
    if(environment.useFirebase) {

    } else {
      return this.http.get<QuestionSet[]>(`${environment.host}/${environment.api.question.list}`);
    }
  }

  get(id) {
    if(environment.useFirebase) {

    } else {
      return this.http.get<QuestionSet>(`${environment.host}/${environment.api.question.get}`);
    }
  }
}
