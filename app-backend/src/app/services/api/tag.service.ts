import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from 'lib-model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private collection = 'Tags'

  constructor(private http: HttpClient, private store: AngularFirestore) { }

  list(config?: { pageSize?: number, responseLast?: any , responseFirst?: any }) {
    if(!config?.pageSize) {
      return this.store.collection<Tag>(this.collection, ref => ref
        .orderBy('text', 'asc')
      ).snapshotChanges();
    } else if(!config?.responseLast && !config?.responseFirst) {
      return this.store.collection<Tag>(this.collection, ref => ref
        .limit(config?.pageSize)
        .orderBy('text', 'asc')
      ).snapshotChanges();
    } else if (config?.responseLast && !config?.responseFirst) {
      return this.store.collection<Tag>(this.collection, ref => ref
        .limit(config?.pageSize)
        .orderBy('text', 'asc')
        .startAfter(config?.responseLast)
      ).snapshotChanges();
    } else {
      return this.store.collection<Tag>(this.collection, ref => ref
        .limit(config?.pageSize)
        .orderBy('text', 'asc')
        .endBefore(config?.responseFirst)
      ).snapshotChanges();
    }
  }

  add(tag: Tag) {
    return this.store.collection<Tag>(this.collection).add(tag);
  }

  update(tag: Tag) {
    return this.store.collection<Tag>(this.collection)
      .doc(tag.id)
      .update(tag);
  }

  delete(id: string) {
    return this.store.collection<Tag>(this.collection)
      .doc(id)
      .delete();
  }
}
