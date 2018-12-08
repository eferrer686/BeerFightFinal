import { Component, OnInit } from '@angular/core';
import { Rules } from '../../interfaces/rules.interface';
import { RulesService } from 'src/app/services/rules.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  rules: Rules[] = [];
  ruleSelected: string[];
  ruleSelectedId: string;
  newRule = false;
  formRules: FormGroup;
  newRules: string[];

  userId: string;

  constructor(private rulesService: RulesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    activatedRoute.params.subscribe(data => {
      this.userId = data['id'];
    });


    this.getRules();


    this.formRules = new FormGroup({
      'rules': new FormControl(),
      'ruleSetName': new FormControl('', [Validators.required]),
      'newRules': new FormArray([
        new FormControl('', Validators.required)
      ])
    });

  }
  public setRules(option: object): void {
    this.ruleSelected = option['rules'];
    this.ruleSelectedId = option['id'];

    this.newRule = false;

  }
  ngOnInit() {

  }

  getRules() {

    this.rules = [];

    this.rulesService.getRules(this.userId).subscribe(data => {
      
      this.rules = data;
      this.setRules({ 'rules': ['Select Ruleset'] });

    });

  }

  addNewRule() {

    (<FormArray>this.formRules.controls['newRules']).push(
      new FormControl('', Validators.required)
    );
  }

  saveNewRules() {

    // tslint:disable-next-line:prefer-const
    let rules: string[] = this.formRules.controls['newRules'].value;
    // tslint:disable-next-line:prefer-const
    let description: string = this.formRules.controls['ruleSetName'].value;

    // tslint:disable-next-line:prefer-const
    let newRules : Rules = {
      decription : description,
      rules : rules,
      userId : this.userId
    };

    this.rulesService.postRules(newRules);
    this.getRules();
  }

  deleteRule() {
    if (this.ruleSelectedId != null) {
      this.rulesService.deleteRule(this.ruleSelectedId);
    }
    this.getRules();
  }

  goToPlay() {
    this.router.navigate(['/play', this.userId]);
  }
}
