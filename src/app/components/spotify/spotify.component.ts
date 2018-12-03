import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.scss']
})
export class SpotifyComponent implements OnInit {

  artista: any = null;
  topTracks: any;
  loading: boolean;
  constructor(private spotify: SpotifyService) { }

  buscar(termino: string) {
    this.loading = true;
    this.spotify.getArtistas(termino).subscribe(data => {
      this.artista = data[0];


      this.spotify.getTopTracks(this.artista.id)
        .subscribe(topTracks => {
          this.topTracks = topTracks;

        });


    });
    //this.loading = false;
  }

  ngOnInit() {
  }
  public openNav() {
    document.getElementById('sidenav').style.width = '100%';
    // document.getElementById("main").style.marginLeft = "250px";

  }
  public closeNav() {
    document.getElementById('sidenav').style.width = '0';
    // document.getElementById("main").style.marginLeft = "0";
  }

}
