import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZipcodeService {

  private baseUrl: string = 'https://ginnidryfruit.azurewebsites.net/api/ZipCodes/';

  constructor(private http: HttpClient, private router: Router) { }


  addZipcode(zipCode: string) {
      const token = sessionStorage.getItem("token");  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    return this.http.post<any>(`${this.baseUrl}addZipCode`, zipCode, {headers})
  }

  getAllZipCode() : Observable<any[]> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.baseUrl}getAllZipCode`, {headers})
  }

 
  checkZipCode(PinCode: string): Observable<{ available: boolean }> {
    return this.http.post<{ available: boolean }>(`${this.baseUrl}checkZipCode`, { PinCode });
  }

  deleteZipCode(zipcodeId : string){
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseUrl}deleteZipCode/${zipcodeId}`, {headers});
  }

  editZipCode(zipcodeId: string, updatedZipCode: any): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.baseUrl}editZipCode/${zipcodeId}`, updatedZipCode, {headers});
  }
}
