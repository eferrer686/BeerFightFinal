import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';
import { TournamentService } from 'src/app/services/tournament.service';



@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.scss']
})
export class CreatePartyComponent implements OnInit {

  formChallengers: FormGroup;

  challengers: string[];
  teamSize: number;

  userId: string;

  persons: string[] = [];
  name = 'add';

  notValid = false;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private tournamentService: TournamentService) {

    activatedRoute.params.subscribe(data => {
      this.userId = data['id'];
      // console.log(this.userId);
    });

    this.formChallengers = new FormGroup({
      'challengers': new FormArray([
        new FormControl(null, Validators.required)
      ]),
      'teamSize': new FormControl(1, Validators.min(1))
    });

    // console.log(this.formChallengers);

  }

  ngOnInit() {
  }

  addChallenger() {
    if (this.formChallengers.valid) {
      (<FormArray>this.formChallengers.controls['challengers']).push(
        new FormControl(null, Validators.required)
      );

      this.challengers = this.formChallengers.controls['challengers'].value;
    }
  }

  goToPlay() {
    this.router.navigate(['/play', this.userId]);
  }
  goToTeams() {
    if (this.formChallengers.valid &&
      this.challengers.length > 1) {

      this.teamSize = this.formChallengers.controls['teamSize'].value;
      this.challengers = this.formChallengers.controls['challengers'].value;

      this.tournamentService.challengers = this.challengers;
      this.tournamentService.teamSize = this.teamSize;
      this.tournamentService.userId = this.userId;

      this.tournamentService.buildTournament();

      this.router.navigate(['/teams', this.userId]);
    } else {
      this.notValid = true;
    }

    //console.log(this.formChallengers);


  }


}
