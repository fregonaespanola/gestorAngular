import { Component, OnInit } from '@angular/core';
import { CitizenData } from '../classes/citizen-data';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { AddRegister } from '../classes/AddRegister';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  data: CitizenData[] = [];
  addRegister: AddRegister = new AddRegister();
  editRegister: AddRegister = new AddRegister();
  showForm: boolean = false;
  username: string = '';

  constructor(private appService: AppService, private http: HttpClient) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.username = localStorage.getItem('username') ?? '';
    this.appService.getAllUsers().subscribe(
      (data: CitizenData[]) => {
        console.log(data);
        this.data = data;
      },
      (error: any) => {
        console.error('Error al obtener la información de todos los usuarios:', error);
      }
    );
  }

  aniadirRegistro() {
    this.http.post<any>('http://localhost:3100/add-register', this.addRegister)
      .subscribe((response: any) => {
        this.refresh();
      }, (error: any) => {
        console.error('Error al enviar la solicitud:', error);
      });
  }
  editarRegistro(item: CitizenData) {
      // Asigna los valores del item seleccionado a addRegister
      this.editRegister.username = item.username;
      this.editRegister.promoter = item.promoter;
      this.editRegister.entity = item.entity;
      this.editRegister.month = item.month;
      this.editRegister.monthly_report = item.monthly_report;
    }

    guardarEditadoRegistro() {
      // Enviar información actualizada al servidor
      this.http.put<any>('http://localhost:3100/update-register', this.editRegister)
        .subscribe((response: any) => {
          // Manejar la respuesta del servidor si es necesario
          console.log('Registro actualizado:', response);
          this.editRegister.username = "";
          this.editRegister.promoter = "";
          this.editRegister.entity =  "";
          this.editRegister.month =  "";
          this.editRegister.monthly_report =  "";
          this.refresh();
        }, (error: any) => {
          console.error('Error al enviar la solicitud:', error);
        });
        
    }
  toggleFormVisibility() {
    this.showForm = !this.showForm;
  }
}
