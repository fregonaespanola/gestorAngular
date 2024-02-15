import { Injectable } from '@angular/core';
import { User } from './classes/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  login(user: User) {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }
}
