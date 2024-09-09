import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private baseUrl: string = 'https://ginnidryfruit.azurewebsites.net/api/User/';
  // private baseUrl: string = 'https://localhost:7132.net/api/User/';
  private baseUrl = environment.baseUrl + '/User/';



  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }

 
}
