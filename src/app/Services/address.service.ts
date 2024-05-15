import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseUrl: string = 'https://localhost:7132/api/Addresses/';

  constructor(private http: HttpClient, private router: Router) { }

  addAddress(userId: string, userAddress: any) {
    return this.http.post<any>(`${this.baseUrl}addAddress?userId=${userId}`, userAddress);
  }
  

  getAddress(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getAddress/${userId}`);
  }


  editAddress(userId: string, addressId: string, updatedAddress: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}editAddress/${addressId}?userId=${userId}`, updatedAddress);
  }
  


  deleteAddress(userId: string, addressId: string) {
    return this.http.delete<any>(`${this.baseUrl}deleteAddress/${addressId}?userId=${userId}`);
  }
  




}
