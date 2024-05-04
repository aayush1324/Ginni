import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl: string = 'https://localhost:7132/api/Image/';

  constructor(private http: HttpClient) { }

  addImages(urls: string[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}addImage`, urls);
  }

  getImages(): Observable<any> {
    return this.http.get(`${this.baseUrl}getImage`);
  }
}