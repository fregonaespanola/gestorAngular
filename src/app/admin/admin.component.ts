import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CitizenData } from '../classes/citizen-data';
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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.username = localStorage.getItem('username') ?? '';
    this.http.get<any>('http://localhost:3100/get-all-users').subscribe(
      (data: CitizenData[]) => {
        console.log(data);
        this.data = data;
        this.compareDataWithAdminData();
      },
      (error: any) => {
        console.error('Error al obtener la información de todos los usuarios:', error);
      }
    );
  }

  compareDataWithAdminData() {
    this.http.get<any>('http://localhost:3100/compare-data-with-admin-data').subscribe(
        (discrepancies: CitizenData[]) => {
            // Manejar las discrepancias encontradas
            console.log('Discrepancias encontradas:', discrepancies);
            discrepancies.forEach(adminItem => {
                const mismatchedRow = document.getElementById(`row-${adminItem.id}`);
                if (mismatchedRow) {
                    mismatchedRow.classList.add('erroneo');
                }
            });
        },
        (error: any) => {
            console.error('Error al obtener las discrepancias:', error);
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
    // Asigna los valores del item seleccionado a editRegister
    this.editRegister.id = item.id;
    this.editRegister.username = item.username;
    this.editRegister.promoter = item.promoter;
    this.editRegister.entity = item.entity;
    this.editRegister.month = item.month;
    this.editRegister.monthly_report = item.monthly_report;

    // Busca el registro en el JSON para obtener su ID
    this.http.get<any>('http://localhost:3100/get-all-users').subscribe((data: CitizenData[]) => {
      const matchingRecord = data.find(record =>
        record.id === item.id &&
        record.name === item.name &&
        record.surname === item.surname &&
        record.promoter === item.promoter &&
        record.entity === item.entity &&
        record.month === item.month &&
        record.monthly_report === item.monthly_report
      );

      console.log("item id "+ item.id)

      if (matchingRecord) {
        // Asigna el ID del registro encontrado a editRegister
        this.editRegister.id = matchingRecord.id;
      } else {
        console.error('No se encontró el registro correspondiente en el JSON.');
      }
    }, (error: any) => {
      console.error('Error al obtener la información de todos los usuarios:', error);
    });
  }

  guardarEditadoRegistro() {
    // Enviar información actualizada al servidor
    console.log("iddd"+this.editRegister.id)
    this.http.put<any>('http://localhost:3100/update-register', this.editRegister)
      .subscribe((response: any) => {
        // Manejar la respuesta del servidor si es necesario
        console.log('Registro actualizado:', response);
        this.editRegister = new AddRegister(); // Limpiar editRegister
        this.refresh();
      }, (error: any) => {
        console.error('Error al enviar la solicitud:', error);
      });
  }

  eliminarRegistro(id: number) {
    this.http.delete<any>(`http://localhost:3100/delete-register/${id}`)
      .subscribe((response: any) => {
        console.log('Registro eliminado:', response);
        this.refresh();
      }, (error: any) => {
        console.error('Error al enviar la solicitud de eliminación:', error);
      });
  }
  
  toggleFormVisibility() {
    this.showForm = !this.showForm;
  }
}
