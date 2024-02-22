import { Injectable } from '@angular/core';
import { User } from './classes/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { CitizenData } from './classes/citizen-data';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  login(user: User) {
    return this.http.post<any>(`${this.apiUrl}/login`, user);}
    
    getUser(username: string): Observable<CitizenData[]> {
      return this.http.get<CitizenData[]>(`${this.apiUrl}/get-user/${username}`);
    }
    getUserByPromoter(username: string): Observable<CitizenData[]> {
      return this.http.get<CitizenData[]>(`${this.apiUrl}/get-user-promoter/${username}`);
    }
    getUserByEntity(username: string): Observable<CitizenData[]> {
      return this.http.get<CitizenData[]>(`${this.apiUrl}/get-user-entity/${username}`);
    }
    getAllUsers(): Observable<CitizenData[]> {
      return this.http.get<CitizenData[]>(`${this.apiUrl}/get-all-users`);
    }
}
