import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';
import { Tournament } from 'src/app/interfaces/tournament.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent implements OnInit {

  tournament: Tournament;
  pointsInFavor = 0;
  pointsAgainst = 0;
  time: number;

  userId: string;


  constructor(private tournamentService: TournamentService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {


    activatedRoute.params.subscribe( data => {
      this.userId = data['id'];
    });


    this.tournament = this.tournamentService.tournament;

    if (this.tournament == null) {
      this.goToPlay();
    }

    //console.log(this.tournament);
    

    for (let i = 0; i < this.tournament.games.length; i++) {
      if (this.tournament.games[i].local === this.tournament.winner) {

        this.pointsInFavor += this.tournament.games[i].localScore;
        this.pointsAgainst += this.tournament.games[i].visitScore;

        //console.log(this.pointsInFavor);
        

      } else if (this.tournament.games[i].visit === this.tournament.winner) {

        this.pointsInFavor += this.tournament.games[i].visitScore;
        this.pointsAgainst += this.tournament.games[i].localScore;
        //console.log(this.pointsInFavor);
      }

    }

    this.time = (this.tournament.dateBeggin.getTime() - this.tournament.dateFinish.getTime()) / -1000;

  }

  ngOnInit() {
  }

  goToPlay() {
    this.router.navigate(['/play', this.userId]);
  }

}
