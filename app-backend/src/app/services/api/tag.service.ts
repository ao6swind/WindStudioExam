import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from 'lib-model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient, private store: AngularFirestore) { }

  list() {
    if(environment.useFirebase) {
      return this.store.collection<Tag>('Tags', ref => ref.limit(10)).snapshotChanges()
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
      return this.http.get<Tag[]>(`${environment.host}/${environment.api.tag.list}`);
    }
  }

  add(tag: Tag) {
    if(environment.useFirebase) {
      return this.store.collection<Tag>('Tags').add(tag);
    } else {
      return new Promise((resolve) => { resolve(null); });
    }
  }

  update(tag: Tag) {
    if(environment.useFirebase) {
      return this.store.collection<Tag>('Tags')
        .doc(tag.id)
        .update(tag);
    } else {
      return new Promise<void>((resolve) => { resolve(); });
    }
  }

  delete(id: string) {
    if(environment.useFirebase) {
      return this.store.collection<Tag>('Tags')
        .doc(id)
        .delete();
    } else {
      return new Promise<void>((resolve) => { resolve(); });
    }
  }
}
