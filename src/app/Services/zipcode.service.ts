import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZipcodeService {

  private baseUrl: string = 'https://localhost:7132/api/ZipCode/';

  constructor(private http: HttpClient, private router: Router) { }


  addZipcode(zipCode: string) {
    return this.http.post<any>(`${this.baseUrl}addZipCode`, zipCode)
  }

  getAllZipCode() : Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getAllZipCode`)
  }

  getZipCode(zipCode: string) : Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}getZipCode/${zipCode}`)
  }

  checkZipCode(zipCode: string): Observable<{ available: boolean }> {
    return this.http.post<{ available: boolean }>(`${this.baseUrl}checkZipcode`, { zipCode });
  }
}
