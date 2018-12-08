import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string;

  constructor(private http: HttpClient) {

   

   }

   getQuery(query: string){
     const url = `https://api.spotify.com/v1/${query}`;

     const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBmhtfXorFJFTJ_VREbCMDDOcCoPN8J4q9yqKJwMB77gTj_HaPGYeth_YLB5K8irdI1G2_zY80LJDuZZQc'
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
