import { Component } from '@angular/core';
import { User } from '../classes/user';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = new User();
  constructor(private appService: AppService, private router: Router) { }
  login() {
    this.appService.login(this.user).subscribe((data: User) => {
      if (data && data.role) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        this.router.navigate(['/', data.role]);
      }
    });
  }
}