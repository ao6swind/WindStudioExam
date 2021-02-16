import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Tag } from 'lib-model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private collection = 'Tags'

  constructor(private store: AngularFirestore) { }

  list() {
    return this.store.collection<Tag>(this.collection, ref => ref
      .orderBy('text', 'asc')
    ).snapshotChanges();
  }
}
