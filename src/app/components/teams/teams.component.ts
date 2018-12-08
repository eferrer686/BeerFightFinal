import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from '../../interfaces/tournament.interface';
import { TournamentService } from 'src/app/services/tournament.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Rules } from 'src/app/interfaces/rules.interface';
import { RulesService } from 'src/app/services/rules.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  challengers: string[];
  teamSize: number;
  userId: string;

  rules: Rules[] = [];
  selectedRules: Rules;

  formRules: FormGroup;

  tournament: Tournament;

  notValid = false;

  constructor(private activatedRoute: ActivatedRoute,
    private route: Router,
    private tournamentService: TournamentService,
    private rulesService: RulesService) {



    activatedRoute.params.subscribe(data => {
      this.userId = data['id'];
    });

    this.tournament = this.tournamentService.tournament;

    if (this.tournament == null) {
      this.goToCreate();
    }

    this.rulesService.getRules(this.userId).subscribe(data => {
      this.rules = data;
    });

    this.formRules = new FormGroup({
      'rules': new FormControl(this.rules[0], Validators.required)
    });

  }

  ngOnInit() {

  }


  goToCreate() {
    this.route.navigate(['/create', this.userId]);
  }
  goToGame() {

    if (this.formRules.valid) {
      this.tournamentService.buildGames();
      this.route.navigate(['/game', this.userId]);
    } else {
      this.notValid = true;
    }
  }
  setRules(rules: Rules) {
    this.tournamentService.tournament.rule = rules;
    this.notValid = false;
  }
}


