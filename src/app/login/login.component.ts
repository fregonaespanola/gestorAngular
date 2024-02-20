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
      if (data) {
        if (data.role === 'citizen') {
          localStorage.setItem('username', data.username);
          this.router.navigate(['/citizen']);
        }
        if (data.role === 'promoter') {
          localStorage.setItem('username', data.username);
          this.router.navigate(['/promoter']);
        }
        if (data.role === 'entity') {
          localStorage.setItem('username', data.username);
          this.router.navigate(['/entity']);
        }
      }
    });
  }
}