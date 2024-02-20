import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { CitizenData } from '../classes/citizen-data';

@Component({
  selector: 'app-promoter',
  templateUrl: './promoter.component.html',
  styleUrl: './promoter.component.css'
})
export class PromoterComponent {
  data: CitizenData[] = [];
  username: string = '';
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username') ?? '';

    if (this.username) {
      this.appService.getUserByPromoter(this.username).subscribe(
        (data: CitizenData[]) => {
          console.log(data);
          this.data = data;
        });
    }
  }
}