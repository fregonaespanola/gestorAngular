import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestorAngular';
  getRoleRoute() {
    const role = localStorage.getItem('role');
    return '/' + role;
  }
}
