import { AngularFirestore } from '@angular/fire/firestore';
import { Exam } from 'lib-model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private collection = 'Exams'

  constructor(private store: AngularFirestore) { }

  count() {
    return this.store.collection<Exam>(this.collection)
      .valueChanges()
      .pipe(map(actions => actions.length));
  }

  list(config?: { pageSize?: number, responseLast?: any , responseFirst?: any }) {
    if(!config?.pageSize) {
      return this.store.collection<Exam>(this.collection, ref => ref
        .orderBy('name', 'asc')
      ).snapshotChanges();
    } else if(!config?.responseLast && !config?.responseFirst) {
      return this.store.collection<Exam>(this.collection, ref => ref
        .limit(config?.pageSize)
        .orderBy('name', 'asc')
      ).snapshotChanges();
    } else if (config?.responseLast && !config?.responseFirst) {
      return this.store.collection<Exam>(this.collection, ref => ref
        .limit(config?.pageSize)
        .orderBy('name', 'asc')
        .startAfter(config?.responseLast)
      ).snapshotChanges();
    } else {
      return this.store.collection<Exam>(this.collection, ref => ref
        .limit(config?.pageSize)
        .orderBy('name', 'asc')
        .endBefore(config?.responseFirst)
      ).snapshotChanges();
    }
  }

  get(id: string) {
    return this.store.collection<Exam>(this.collection)
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

  add(exam: Exam) {
    return this.store.collection<Exam>(this.collection).add(exam);
  }

  update(exam: Exam) {
    return this.store.collection<Exam>(this.collection).doc(exam.id).update(exam);
  }

  delete(id: string) {
    return this.store.collection<Exam>(this.collection).doc(id).delete();
  }
}
