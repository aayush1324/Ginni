import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  // private baseUrl: string = 'https://ginnidryfruit.azurewebsites.net/api/Addresses/';
  // private baseUrl: string = 'https://localhost:7132/api/Addresses/';
  private baseUrl = environment.baseUrl + '/Addresses/';


  constructor(private http: HttpClient, private router: Router) { }

  addAddress(userId: string, userAddress: any): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}addAddress?userId=${userId}`, userAddress, {headers});
  }
  

  getAddress(userId: string): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}getAddress/${userId}`, {headers});
  }


  editAddress(userId: string, addressId: string, updatedAddress: any): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.baseUrl}editAddress/${addressId}?userId=${userId}`, updatedAddress, {headers});
  }
  


  deleteAddress(userId: string, addressId: string) {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseUrl}deleteAddress/${addressId}?userId=${userId}`, {headers});
  }
  




}
