import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string;

  constructor(private http: HttpClient) {

    let url = 'http://localhost:3000/api/rules';

    let body = {grant_type: 'client_credentials',
                client_id: '00bf8ccf83f7485dbd1b5ecf1bdb1a2b',
                client_secret: 'b42f4f43a80d44ec8ebc67d7670e53a0'};

    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    http.post(url, body, {headers}).subscribe(data => {
      console.log(data);
      
    });

   }

   getQuery(query: string){
     const url = `https://api.spotify.com/v1/${query}`;

     const headers = new HttpHeaders({
      'Authorization': 'Bearer BQD8FWfd4PE7UxChHwpBiRO-KshmzxJy773kPKrrXQtFFS8MTmY0SYBp8Yp0XkRCxXU5KpdSWMxEnREUdl0'
    });

    return this.http.get(url, {headers});
   }

   getNewRealeses() {

    return this.getQuery('browse/new-releases')
                .pipe( map( data => data['albums'].items ));

   }

   getArtistas(termino: string){

    return this.getQuery(`search?q=${termino}&type=artist&limit=1`)
      .pipe( map( data => data['artists'].items));
   }

   getArtista(id: string){
    return this.getQuery(`artists/${id}`);
   }

   getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
    .pipe( map( data => data['tracks']));
   }
}
