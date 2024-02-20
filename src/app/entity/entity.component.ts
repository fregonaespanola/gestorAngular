import { Component } from '@angular/core';
import { CitizenData } from '../classes/citizen-data';
import { AppService } from '../app.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.css'
})
export class EntityComponent {
  data: CitizenData[] = [];
  username: string = '';
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username') ?? '';

    if (this.username) {
      this.appService.getUserByEntity(this.username).subscribe(
        (data: CitizenData[]) => {
          console.log(data);
          this.data = data;
        });
    }
  }
}