import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Link } from 'lib-model';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private collection = 'Links'

  constructor(private store: AngularFirestore) { }

  list() {
    return this.store.collection<Link>(this.collection, ref => ref
      .orderBy('icon', 'asc')
    ).snapshotChanges();
  }
}
