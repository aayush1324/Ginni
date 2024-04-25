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

 
  checkZipCode(PinCode: string): Observable<{ available: boolean }> {
    return this.http.post<{ available: boolean }>(`${this.baseUrl}checkZipCode`, { PinCode });
  }

  deleteZipCode(zipcodeId : string){
    return this.http.delete<any>(`${this.baseUrl}deleteZipCode/${zipcodeId}`);
  }

  editZipCode(zipcodeId: string, updatedZipCode: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}editZipCode/${zipcodeId}`, updatedZipCode);

  }
}
