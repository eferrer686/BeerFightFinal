import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Tournament } from '../interfaces/tournament.interface';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  tournaments: Tournament[];

  constructor(private http: Http) {
    this.getTournaments();
  }

  getNumWins() {

    let url = 'http://localhost:3000/api/tournaments';

    return this.http.get(url);
  }


  public getTournaments() {

    let url = 'http://localhost:3000/api/tournaments';

    this.http.get(url).subscribe(data => {
      this.tournaments = JSON.parse(data['_body']);
      //console.log(this.tournaments);
    });

  }
}
