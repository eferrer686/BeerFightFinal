import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from 'src/app/services/tournament.service';
import { Tournament, Game } from 'src/app/interfaces/tournament.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  tournament: Tournament;
  userId: Tournament;
  currentGame: Game;



  constructor(private activatedRoute: ActivatedRoute,
    private tournamentService: TournamentService,
    private router: Router) {
    activatedRoute.params.subscribe(data => {
      this.userId = data['id'];

    });

    this.tournament = this.tournamentService.tournament;

    if (this.tournament == null) {
      this.router.navigate(['create', this.userId]);
    }

    this.currentGame = this.tournamentService.nextGame();
    this.currentGame.localScore = 0;
    this.currentGame.visitScore = 0;

  }

  visitScore(point) {
    this.currentGame.visitScore += point;
  }

  localScore(point) {
    this.currentGame.localScore += point;
  }

  nextGame() {
    //console.log({ currentGame: this.currentGame });

    if (this.currentGame.localScore > this.currentGame.visitScore) {
      this.currentGame.winner = this.currentGame.local;
    } else if (this.currentGame.localScore < this.currentGame.visitScore) {
      this.currentGame.winner = this.currentGame.visit;
    } else {
      return null;
    }

    this.currentGame = this.tournamentService.nextGame(this.currentGame);
    // console.log({ nextGame: this.currentGame });

    if (this.currentGame == null) {

      this.tournamentService.postTournament().subscribe();

      this.router.navigate(['/winner', this.userId]);

    }
  }

}
