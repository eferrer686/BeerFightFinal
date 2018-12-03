import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';




@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: Http) {

  }

  public login() {

    let url = 'http://localhost:3000/api/users';

    let headers: Headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.get(url, { headers });
  }
  public registerUser(user: User) {

    let url = 'http://localhost:3000/api/users';

    let body = user;

    let headers: Headers = new Headers({ 'Content-Type': 'application/json' });


    //console.log([url, body, headers]);



    return this.http.post(url, body, { headers });

  }
  public delete(userId) {

    let url = `http://localhost:3000/api/users/${userId}`;

    let headers: Headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.delete(url, { headers });
  }
}
