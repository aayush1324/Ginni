import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = 'https://localhost:7132/api/Product/';

  constructor(private http: HttpClient, private router: Router) { }


  addProducts(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}addProductsWithImages`, formData);
  }

  getProductsWithImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getProductsWithImages`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getProduct`); 
  }

  editProducts(productId: string, updatedProduct: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}editProduct/${productId}`, updatedProduct);
  }

  deleteProducts(productId: string) {
    return this.http.delete<any>(`${this.baseUrl}deleteProduct/${productId}`);
  }

  getProductDetailsByName(productName: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getProductName/${productName}`);
  }

}
