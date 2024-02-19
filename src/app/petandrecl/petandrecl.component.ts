import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importa el módulo Router

interface FormData {
  name: string;
  subject: string;
  request: string;
}

@Component({
  selector: 'app-petandrecl',
  templateUrl: './petandrecl.component.html',
  styleUrls: ['./petandrecl.component.css']
})
export class PetandreclComponent {
  formData: FormData = {
    name: '',
    subject: '',
    request: ''
  };

  constructor(private http: HttpClient, private router: Router) {} // Inyecta el módulo Router

  submitForm() {
    this.http.post<any>('http://localhost:3000/save-petition', this.formData).subscribe(
      response => {
        console.log('Petition successfully sent:', response);
        this.router.navigate(['/citizen']);
      },
      error => {
        console.error('Error sending petition:', error);
      }
    );
  }
}
