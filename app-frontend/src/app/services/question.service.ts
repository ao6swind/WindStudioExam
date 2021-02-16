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

  list(config?: { direction?: number, response: any }) {
    if(config.direction === 1) {
      return this.store.collection<QuestionSet>(this.collection, ref => ref
        .limit(1)
        .orderBy('createdAt', 'desc')
        .startAfter(config?.response)
      ).snapshotChanges();
    } else if (config.direction === -1) {
      return this.store.collection<QuestionSet>(this.collection, ref => ref
        .limit(1)
        .orderBy('createdAt', 'desc')
        .endBefore(config?.response)
      ).snapshotChanges();
    } else {
      if(config.response) {
        console.log('in');
        return this.store.collection<QuestionSet>(this.collection, ref => ref
          .limit(1)
          .orderBy('createdAt', 'desc')
          .startAt(config?.response)
        ).snapshotChanges();
      }
      else {
        return this.store.collection<QuestionSet>(this.collection, ref => ref
          .limit(1)
          .orderBy('createdAt', 'desc')
        ).snapshotChanges();
      }
    }
  }

  count() {
    return this.store.collection<QuestionSet>(this.collection)
      .valueChanges()
      .pipe(map(actions => actions.length));
  }

  listWithTopic(config?: { direction?: number, topics?: string[], type?: string, response?: any }) {
    const operator = (config?.type.toUpperCase() === 'OR') ? 'array-contains-any' : 'array-contains';
    if(config?.direction === 1) {
      return this.store.collection<QuestionSet>(this.collection, ref => ref
        .where('tags', operator, config?.topics)
        .limit(1)
        .orderBy('createdAt', 'desc')
        .startAfter(config?.response)
      ).snapshotChanges();
    } else if (config?.direction === -1) {
      return this.store.collection<QuestionSet>(this.collection, ref => ref
        .where('tags', operator, config?.topics)
        .limit(1)
        .orderBy('createdAt', 'desc')
        .endBefore(config?.response)
      ).snapshotChanges();
    } else {
      return this.store.collection<QuestionSet>(this.collection, ref => ref
        .where('tags', operator, config?.topics)
        .limit(1)
        .orderBy('createdAt', 'desc')
      ).snapshotChanges();
    }
  }

  countWithTopic(config: { topics: string[], type: string }) {
    const operator = (config?.type.toUpperCase() === 'OR') ? 'array-contains-any' : 'array-contains';
    return this.store.collection<QuestionSet>(this.collection, ref => ref.where('tags', operator, config.topics))
      .valueChanges()
      .pipe(map(actions => actions.length));
  }
}
