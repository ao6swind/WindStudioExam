import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionSet } from 'lib-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private collection = 'QuestionSets'
  
  constructor(private store: AngularFirestore) { 
    const request = indexedDB.open('WindStudioExam', 1);
    request.onupgradeneeded = (event) => {
      const db = request.result;
      db.createObjectStore('favors', { keyPath: 'id' });
    };

    request.onsuccess = (event) => {
      
    };

    request.onerror = (event) => {
      
    };
  }

  isSupportIndexedDb() {
    return (window.indexedDB);
  }

  addToFavor(questionSet: QuestionSet) {
    indexedDB.open('WindStudioExam', 1).onsuccess = (event) => {
      const db = event.target['result'];
      const trans = db.transaction(['favors'], 'readwrite');
      const objectStore = trans.objectStore('favors');
      const result = objectStore.put(questionSet);
      result.onerror = (event) => {
        
      };

      trans.oncomplete = (event) => {
        
      };
    }
  }

  removeFromFavor(id: string) {
    indexedDB.open('WindStudioExam', 1).onsuccess = (event) => {
      const db = event.target['result'];
      const trans = db.transaction(['favors'], 'readwrite');
      const objectStore = trans.objectStore('favors');
      const result = objectStore.delete(id);
      
      result.onerror = (event) => {
        
      };

      trans.oncomplete = (event) => {
        
      };
    }
  }

  findFavor(id: string) {
    return new Observable<QuestionSet>((observer) => {
      indexedDB.open('WindStudioExam', 1).onsuccess = (event) => {
        const db = event.target['result'];
        const trans = db.transaction(['favors'], 'readwrite');
        const objectStore = trans.objectStore('favors');
        const result = objectStore.get(id);
        
        result.onerror = (event) => {
          
        };
        
        result.onsuccess = (event) => {
          observer.next(event.target.result);
        };
      }

      return { unsubscribe() { } };
    });
  }

  listFavors(): Observable<QuestionSet[]> {
    return new Observable<QuestionSet[]>((observer) => {
      const questionSets: QuestionSet[] = [];
      indexedDB.open('WindStudioExam', 1).onsuccess = (event) => {
        const db = event.target['result'];
        const trans = db.transaction(['favors'], 'readwrite');
        const objectStore = trans.objectStore('favors');
        const result = objectStore.openCursor();

        result.onerror = (event) => {
          
        };
        
        result.onsuccess = (event) => {
          let cursor = event.target.result;
          if (cursor) {
            questionSets.push(cursor.value);
            cursor.continue();
          } else {
            observer.next(questionSets);
          }
        };
      }

      return {
        unsubscribe() {
          questionSets.splice(0, questionSets.length);
        }
      };
    });
  }

  get(id: string) {
    return this.store.collection<QuestionSet>(this.collection).doc(id).snapshotChanges();
  }

  list(config?: { direction?: number, response: any }) {
    if(config.direction === 1) {
      return this.store.collection<QuestionSet>(this.collection, ref => ref
        .limit(1)
        .orderBy('createdAt', 'asc')
        .startAfter(config?.response)
      ).snapshotChanges();
    } else if (config.direction === -1) {
      return this.store.collection<QuestionSet>(this.collection, ref => ref
        .limit(1)
        .orderBy('createdAt', 'asc')
        .endBefore(config?.response)
      ).snapshotChanges();
    } else {
      if(config.response) {
        return this.store.collection<QuestionSet>(this.collection, ref => ref
          .limit(1)
          .orderBy('createdAt', 'asc')
          .startAt(config?.response)
        ).snapshotChanges();
      }
      else {
        return this.store.collection<QuestionSet>(this.collection, ref => ref
          .limit(1)
          .orderBy('createdAt', 'asc')
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
    const operator = (config?.type?.toUpperCase() === 'OR') ? 'array-contains-any' : 'array-contains';
    if(config?.direction === 1) {
      return this.store.collection<QuestionSet>(this.collection, ref => ref
        .where('tags', operator, config?.topics)
        .limit(1)
        .orderBy('createdAt', 'asc')
        .startAfter(config?.response)
      ).snapshotChanges();
    } else if (config?.direction === -1) {
      return this.store.collection<QuestionSet>(this.collection, ref => ref
        .where('tags', operator, config?.topics)
        .limit(1)
        .orderBy('createdAt', 'asc')
        .endBefore(config?.response)
      ).snapshotChanges();
    } else {
      return this.store.collection<QuestionSet>(this.collection, ref => ref
        .where('tags', operator, config?.topics)
        .limit(1)
        .orderBy('createdAt', 'asc')
      ).snapshotChanges();
    }
  }

  countWithTopic(config: { topics: string[], type: string }) {
    const operator = (config?.type?.toUpperCase() === 'OR') ? 'array-contains-any' : 'array-contains';
    return this.store.collection<QuestionSet>(this.collection, ref => ref.where('tags', operator, config.topics))
      .valueChanges()
      .pipe(map(actions => actions.length));
  }
}
