import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  // private baseUrl: string = 'https://ginnidryfruit.azurewebsites.net/api/Images/';
  // private baseUrl: string = 'https://localhost:7132/api/Images/';
  private baseUrl = environment.baseUrl + '/Images/';



  constructor(private http: HttpClient) { }


  // Convert data URI to Blob
  dataURItoBlob(dataURI: string | ArrayBuffer): Blob {
    const byteString = atob(dataURI.toString().split(',')[1]);
    const mimeString = dataURI.toString().split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  addMultipleImages(productId: string, images: { name: string, data: string | ArrayBuffer }[]) {
    const formData = new FormData();
    
    images.forEach(image => {
      const blob = this.dataURItoBlob(image.data);
      formData.append('images', blob, image.name);
    });
    
    formData.append('productId', productId); // Append the product ID to the FormData

    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.post<any>(`${this.baseUrl}addMultipleImage`, formData, {headers});
  }
  
  getImagesByProductId(productId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getImagesByProductId/${productId}`);
  }

}
