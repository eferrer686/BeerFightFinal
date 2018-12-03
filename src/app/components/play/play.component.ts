import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  userID: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tournamentService: TournamentService
  ) {

    this.activatedRoute.params.subscribe(data => {
      this.userID = data['id'];

    });
  }

  goToRules() {
    this.router.navigate(['/rules', this.userID]);
  }
  goToCreate() {
    this.router.navigate(['/create', this.userID]);
  }
  goToGame() {

    let teamSize = 1;
    let challengers = ['Local', 'Visit'];

    this.tournamentService.challengers = challengers;
    this.tournamentService.teamSize = teamSize;
    this.tournamentService.userId = this.userID;


    this.tournamentService.buildTournament();
    this.tournamentService.buildGames();

    this.router.navigate(['/game', this.userID]);
  }

  goToPrep() {
    this.router.navigate(['/prep', this.userID]);
  }

  goToStats() {
    this.router.navigate(['/stats', this.userID]);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }


}
