import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  invalidPasswords = false;
  invalidForm = false;

  constructor(private auth: AuthenticationService,
              private router: Router) {
    this.formRegister = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'password2': new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  register() {
    

    if (this.formRegister.valid && !this.invalidPasswords) {
      let user: User = {
        name: this.formRegister.controls['name'].value,
        password: this.formRegister.controls['password'].value,
        email: this.formRegister.controls['email'].value,
        username: this.formRegister.controls['username'].value
      };

      this.auth.registerUser(user);

      this.router.navigate(['/login']);

    } else {
      this.invalidForm = true;
    }
    
  }

  verifyPasswords(){
    if (this.formRegister.controls['password'].value !==
    this.formRegister.controls['password2'].value) {
      this.invalidPasswords = true;
    } else {
      this.invalidPasswords = false;
    }
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

}
