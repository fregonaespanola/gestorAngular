import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CitizenData } from '../classes/citizen-data';
import { AppService } from '../app.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-citizen',
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.css']
})

export class CitizenComponent implements OnInit {
  data: CitizenData=new CitizenData();

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    let username = localStorage.getItem('username');

    if (username) {
      this.appService.getUser(username).subscribe(
        (data: CitizenData) => {
          this.data = data;
        });
    }
  }
}