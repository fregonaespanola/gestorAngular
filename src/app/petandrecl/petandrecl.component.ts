import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormData } from '../classes/FormData';


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

  constructor(private http: HttpClient, private router: Router) {}

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
