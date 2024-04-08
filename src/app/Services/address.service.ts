import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseUrl: string = 'https://localhost:7132/api/Address/';

  constructor(private http: HttpClient, private router: Router) { }

  addAddress(userAddress: any ) {
    return this.http.post<any>(`${this.baseUrl}addAddress`, userAddress)
  }

  deleteAddress(addressId: string) {
    return this.http.delete<any>(`${this.baseUrl}deleteAddress/${addressId}`);
  }

  editAddress(addressId: string, updatedAddress: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}editAddress/${addressId}`, updatedAddress);
  }

  getAddress(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getAddress`); // Make a GET request to fetch addresses
  }
}
