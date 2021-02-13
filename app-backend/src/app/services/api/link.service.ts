import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Link } from 'lib-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private collection = 'Links'

  constructor(private store: AngularFirestore) { }

  count() {
    return this.store.collection<Link>(this.collection)
      .valueChanges()
      .pipe(map(actions => actions.length));
  }

  list(config?: { pageSize?: number, responseLast?: any , responseFirst?: any }) {
    if(!config?.pageSize) {
      return this.store.collection<Link>(this.collection, ref => ref
        .orderBy('title', 'asc')
      ).snapshotChanges();
    } else if(!config?.responseLast && !config?.responseFirst) {
      return this.store.collection<Link>(this.collection, ref => ref
        .limit(config?.pageSize)
        .orderBy('title', 'asc')
      ).snapshotChanges();
    } else if (config?.responseLast && !config?.responseFirst) {
      return this.store.collection<Link>(this.collection, ref => ref
        .limit(config?.pageSize)
        .orderBy('title', 'asc')
        .startAfter(config?.responseLast)
      ).snapshotChanges();
    } else {
      return this.store.collection<Link>(this.collection, ref => ref
        .limit(config?.pageSize)
        .orderBy('title', 'asc')
        .endBefore(config?.responseFirst)
      ).snapshotChanges();
    }
  }

  get(id: string) {
    return this.store.collection<Link>(this.collection)
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

  add(link: Link) {
    return this.store.collection<Link>(this.collection).add(link);
  }

  update(link: Link) {
    return this.store.collection<Link>(this.collection).doc(link.id).update(link);
  }

  delete(id: string) {
    return this.store.collection<Link>(this.collection).doc(id).delete();
  }
}
