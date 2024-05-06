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

  addMultipleImages(productId: string, images: { name: string, data: string | ArrayBuffer }[]) {
    const formData = new FormData();
    images.forEach(image => {
      const blob = this.dataURItoBlob(image.data);
      formData.append('images', blob, image.name);
    });
    formData.append('productId', productId); // Append the product ID to the FormData
    return this.http.post<any>(`${this.baseUrl}addMultipleImage`, formData);
  }
  
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
  
  getImagesByProductId(productId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getImagesByProductId/${productId}`);
  }

}
