import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CitizenData {
  name: string;
  surname: string;
  promoter: string;
  entity: string;
  total: string;
  monthly_report: string;
}

@Component({
  selector: 'app-citizen',
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.css']
})
export class CitizenComponent implements OnInit {
  user: { name: string, surname: string };
  data: CitizenData[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Simular inicio de sesión y obtención de datos del usuario
    this.user = { name: 'Daniel', surname: 'Garcia' };

    // Obtener datos del servidor
    this.http.get<CitizenData[]>('http://localhost:3000/get-data').subscribe(
      data => {
        this.data = data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
