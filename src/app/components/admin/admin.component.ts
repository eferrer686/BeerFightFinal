import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: User[];

  constructor(private userService: AuthenticationService,
              private router: Router) {
    userService.login().subscribe( data => {
      this.users = JSON.parse(data['_body']);
    });
   }

  ngOnInit() {
  }

  update() {
    this.userService.login().subscribe( data => {
      this.users = JSON.parse(data['_body']);
    });
  }

  delete(user: User) {
    this.userService.delete(user.id).subscribe( data => {
      this.update();
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }


}
