import { Component, OnInit } from '@angular/core';
import { CitizenData } from '../classes/citizen-data';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AddRegister } from '../classes/AddRegister';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent{
  data: CitizenData[] = [];
  username: string = '';
  addRegister: AddRegister= new AddRegister();
  showForm: boolean = false;

  constructor(private appService: AppService, private http: HttpClient) { }


  refresh(){
    this.username = localStorage.getItem('username') ?? '';

    if (this.username) {
      this.appService.getUserByEntity(this.username).subscribe(
        (data: CitizenData[]) => {
          console.log(data);
          this.data = data;
        });
    }
  }
  ngOnInit() {
    this.refresh();
  }

  aniadirRegistro() {
    this.addRegister.entity = this.username;
    this.http.post<any>('http://localhost:3100/add-register', this.addRegister)
      .subscribe((response: any) => {
        this.refresh();
      }, (error: any) => {
        console.error('Error al enviar la solicitud:', error);
      });
  }

  toggleFormVisibility() {
    this.showForm = !this.showForm;
}
}

