import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';


import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  username: any;
  password: any;

  admin: boolean;

  // usuarios: Array = data.users;

  formLogin: FormGroup;

  constructor(private auth: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formLogin = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      'password': new FormControl('', [Validators.required, Validators.minLength(1)])
    });

  }


  public login() {

    let controls = this.formLogin.controls;


    this.username = controls['username'].value;
    this.password = controls['password'].value;

    let user: User = {
      username: this.username,
      password: this.password
    };

    this.auth.login().subscribe(data => {
      let users = data;

        //console.log(users);
        

      for (let i = 0; i < users.length; i++) {
        if (user.username === users[i]['username'] &&
          user.password === users[i]['password']) {
          
          
          this.auth.user = users[i];

          this.router.navigate(['/play', users[i]['id']]);
        }
      }

    });




  }

  ngOnInit() {

  }

  register() {
    this.router.navigate(['/register']);
  }

}
