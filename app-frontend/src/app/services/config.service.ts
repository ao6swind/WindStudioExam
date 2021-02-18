import { AngularFirestore } from '@angular/fire/firestore';
import { Config } from 'lib-model';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private collection = 'Configs'

  constructor(private store: AngularFirestore) { }

  get() {
    return this.store.collection<Config>(this.collection)
      .doc(environment.configId)
      .get()
      .pipe(
        map((action) => {
          const data = action.data();
          const id = action.id;
          return { id, ...data };
        })
      );
  }
}
