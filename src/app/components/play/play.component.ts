import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from 'src/app/services/tournament.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
    private tournamentService: TournamentService,
    private auth: AuthenticationService
  ) {

    this.activatedRoute.params.subscribe(data => {
      this.userID = data['id'];

    });
    if (!auth.isLogged(this.userID)) {
      this.logout();
    }
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
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }


}
