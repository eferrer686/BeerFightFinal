import { Injectable } from '@angular/core';
import { Rules } from '../interfaces/rules.interface';
import { Http, Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor(private http: Http) { }

  public getRules() {

    let url = 'http://localhost:3000/api/rules';

    let headers: Headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.get(url);
  }
  public postRules(rules: Rules) {

    let url = 'http://localhost:3000/api/rules';

    let body = rules;

    let headers: Headers = new Headers({ 'Content-Type': 'application/json' });



    return this.http.post(url, body, { headers });

  }

  public deleteRule(id: string) {
    let url = `http://localhost:3000/api/rules/${id}`;



    let headers: Headers = new Headers({ 'Content-Type': 'application/json' });

    console.log([url, headers]);

    return this.http.delete(url, { headers });
  }
}
