import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionSet } from 'lib-model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient, private store: AngularFirestore) { }

  list(pageSize: number, lastResponse: any[]) {
    if(environment.useFirebase) {
      return this.store.collection<QuestionSet>('QuestionSets', ref => ref.limit(10)).snapshotChanges()
        .pipe(
          map((actions) => { 
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            }) 
          })
        );
    } else {
      return this.http.get<QuestionSet[]>(`${environment.host}/${environment.api.question.list}`);
    }
  }

  get(id: string) {
    if(environment.useFirebase) {
      return this.store.collection<QuestionSet>('QuestionSets')
        .doc(id)
        .get()
        .pipe(
          map((action) => {
            const data = action.data();
            const id = action.id;
            return { id, ...data };
          })
        );
    } else {
      return this.http.get<QuestionSet>(`${environment.host}/${environment.api.question.get}`);
    }
  }

  add(questionSet: QuestionSet) {
    if(environment.useFirebase) {
      return this.store.collection<QuestionSet>('QuestionSets')
        .add(questionSet);
    } else {
      return new Promise(() => { });
    }
  }

  update(questionSet: QuestionSet) {
    return this.store.collection<QuestionSet>('QuestionSets')
      .doc(questionSet.id)
      .update(questionSet);
  }

  delete(id: string) {
    return this.store.collection<QuestionSet>('QuestionSets')
      .doc(id)
      .delete();
  }
}
