import { Injectable } from '@angular/core';
import { Rules } from '../interfaces/rules.interface';
import { Http, Headers } from '@angular/http';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RulesService {

  rulesCollection: AngularFirestoreCollection;

  constructor(public db: AngularFirestore) { }

  public getRules(id: string) {

    this.rulesCollection = this.db.collection<any>('rules',
                                                  ref => ref.where('userId', '==', id));

    return this.rulesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        //console.log(data);
        return { id, ...data };
      }))
    );
  }
  public postRules(rules: Rules) {

    this.rulesCollection.add(rules);

  }

  public deleteRule(id: string) {
    this.rulesCollection.doc(id).delete();
  }
}
