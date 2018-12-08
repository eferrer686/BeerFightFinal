import { Injectable } from '@angular/core';

import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { async } from 'q';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  usersCollection: AngularFirestoreCollection<any>;
  usersSnapshot: Observable<any[]>;
  users: User[];

  user: User;

  constructor(public db: AngularFirestore,
    private router: Router) {

  }

  public login() {


    this.usersCollection = this.db.collection<any>('users');

    return this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }

  public registerUser(user: User) {

    this.usersCollection = this.db.collection<any>('users');
    this.usersCollection.add(user);
  }

  logout() {
    this.user = null;

  }

  isLogged(id: string) {
    return this.user !== null && this.user.id === id;
  }
}

export class EmailPasswordCredentials {
  email: string;
  password: string;
}