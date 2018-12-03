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


  public goToPlay() {

    // this.username = document.getElementById('username').value.toString();
    // this.password = document.getElementById('password').value.toString();

    /* this.usuarios.forEach(user => {
      if (this.username === user.name && this.password === user.password) {
        // gotoplay
      }
    }); */
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

      let users = JSON.parse(data['_body']);

      let userID = null;

      for (let i = 0; i < users.length; i++) {
        //console.log(users[i]);

        if (users[i]['username'] === user.username &&
          users[i]['password'] === user.password) {
          userID = users[i]['id'];
          this.username = user.username;
          this.password = user.password;
          
          if (users[i].admin) {
            this.admin = true;
          }
        }


      }


      if (this.admin) {
        this.router.navigate(['/admin', userID]);
      }
      else{
        this.router.navigate(['/play', userID]);
      }



    });



  }

  ngOnInit() {

  }

  register() {
    this.router.navigate(['/register']);
  }

}
