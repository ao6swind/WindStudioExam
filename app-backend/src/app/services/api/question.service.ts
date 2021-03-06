import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { QuestionSet } from 'lib-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private collection = 'QuestionSets'

  constructor(private store: AngularFirestore) { }

  count() {
    return this.store.collection<QuestionSet>(this.collection)
      .valueChanges()
      .pipe(map(actions => actions.length));
  }

  list(config?: { pageSize?: number, responseLast?: any , responseFirst?: any }) {
    if(!config?.pageSize) {
      return this.store.collection<QuestionSet>(this.collection, ref => ref
        .orderBy('createdAt', 'desc')
      ).snapshotChanges();
    } else if(!config?.responseLast && !config?.responseFirst) {
      return this.store.collection<QuestionSet>(this.collection, ref => ref
        .limit(config?.pageSize)
        .orderBy('createdAt', 'desc')
      ).snapshotChanges();
    } else if (config?.responseLast && !config?.responseFirst) {
      return this.store.collection<QuestionSet>(this.collection, ref => ref
        .limit(config?.pageSize)
        .orderBy('createdAt', 'desc')
        .startAfter(config?.responseLast)
      ).snapshotChanges();
    } else {
      return this.store.collection<QuestionSet>(this.collection, ref => ref
        .limit(config?.pageSize)
        .orderBy('createdAt', 'desc')
        .endBefore(config?.responseFirst)
      ).snapshotChanges();
    }
  }

  get(id: string) {
    return this.store.collection<QuestionSet>(this.collection)
      .doc(id)
      .get()
      .pipe(
        map((action) => {
          const data = action.data();
          const id = action.id;
          return { id, ...data };
        })
      );
  }

  add(questionSet: QuestionSet) {
    return this.store.collection<QuestionSet>(this.collection)
      .add(questionSet);
  }

  update(questionSet: QuestionSet) {
    return this.store.collection<QuestionSet>(this.collection)
      .doc(questionSet.id)
      .update(questionSet);
  }

  delete(id: string) {
    return this.store.collection<QuestionSet>(this.collection)
      .doc(id)
      .delete();
  }
}
