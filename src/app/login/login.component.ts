import { Component } from '@angular/core';
import { User } from '../classes/user';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = new User();
  constructor(
    private appService: AppService,
  ) { }
  login() {
    this.appService.login(this.user).subscribe((data: User) => {
      if (data) {

      }
    });
  }
}
