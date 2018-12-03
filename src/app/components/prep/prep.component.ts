import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-prep',
  templateUrl: './prep.component.html',
  styleUrls: ['./prep.component.scss']
})
export class PrepComponent implements OnInit {

  specs: string;
  liters: number;

  cups: number;
  players: number;
  type: string;

  userId: string;

  formPrep: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(data => {
      this.userId = data['id'];
    });

    this.formPrep = new FormGroup({
      'type': new FormControl(),
      'cups': new FormControl(12),
      'players': new FormControl(4)
    });

  }

  ngOnInit() {
  }


  goToPlay() {
    this.router.navigate(['/play', this.userId]);
  }

  calculate() {
    this.cups = this.formPrep.controls['cups'].value;
    this.type = this.formPrep.controls['type'].value;
    this.players = this.formPrep.controls['players'].value;


    

    if (this.type === 'can') {
      this.liters = Math.trunc(this.players * this.cups * (0.355 / 6));
      let cans = this.players * (this.cups / 6);
      this.specs =  Math.ceil(cans) + ' cans';
    }
    if (this.type === 'bottle') {
      this.liters = this.players * this.cups * (0.355 / (5 * 6));
      let cans = this.liters / .750;
      this.specs = Math.ceil(cans) + ' bottles';
    }

    if (this.type === 'wine') {
      this.liters = this.players * this.cups * (0.355 / 6);
      let cans = this.liters;
      this.specs = Math.ceil(cans) + ' bottles';
    }

  }

}
