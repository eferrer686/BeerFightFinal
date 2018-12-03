import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';
import { Tournament } from 'src/app/interfaces/tournament.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  tournaments: Tournament[];
  numWins: number;
  gamesPlayed: number;
  scored = 0;
  userId: string;

  formSearch: FormGroup;

  constructor(private statsService: StatsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    activatedRoute.params.subscribe( data => {
      this.userId = data['id'];
    });

    this.formSearch = new FormGroup({
      'search': new FormControl()
    });

  }



  ngOnInit() {
  }

  update(){
    let name =  this.formSearch.controls['search'].value;
    this.wins(name);
    this.gamesHistory(name);
    //console.log( this.formSearch.controls['search']);
  }

  wins(name: string) {
    this.statsService.getNumWins().subscribe(data => {
      this.tournaments = JSON.parse(data['_body']);

      //console.log(this.tournaments);



      let count = 0;
      for (let t of this.tournaments) {
        //console.log(t);
        if (t.winner != null) {
          for (let c of t.winner.challengers) {
            if (c === name) {
              count++;
            }
          }
        }
      }
      this.numWins = count;
    });
  }

  gamesHistory(name: String) {
    this.statsService.getNumWins().subscribe(data => {
      this.tournaments = JSON.parse(data['_body']);


      let tournamentPlayed: Tournament[] = [];
      let scored = 0;

      for (let t of this.tournaments) {
        //console.log(t);
        for (let g of t.games) {
          if (g.local != null) {
            for (let l of g.local.challengers) {
              if (l === name) {
                tournamentPlayed.push(t);

                if (g.localScore != null) {
                  scored += g.localScore;
                }


              }
            }
          }
          if (g.visit != null) {
            for (let v of g.visit.challengers) {
              if (v === name) {
                tournamentPlayed.push(t);
                if (g.visitScore != null) {
                  scored += g.visitScore;
                }

              }
            }
          }
        }
      }
      this.gamesPlayed = tournamentPlayed.length;
      this.scored = scored;


      //console.log(tournamentPlayed);

    });
  }
  goToPlay() {
    this.router.navigate(['/play', this.userId]);
  }
}
