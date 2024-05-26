import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = 'https://localhost:7132/api/Products/';

  constructor(private http: HttpClient, private router: Router) { }


  getProductsWithImage(UserID: string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getProductsWithImage/${UserID}`);
  }

  getProductsWithImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getProductsWithImages`);
  }


  addProducts(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}addProductsWithImages`, formData);
  }


  editProducts(productId: string, updatedProduct: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}editProduct/${productId}`, updatedProduct);
  }


  deleteProducts(productId: string) {
    return this.http.delete<any>(`${this.baseUrl}deleteProduct/${productId}`);
  }


  searchProducts(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}search?term=${term}`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getProduct`); 
  }

  
  getProductDetailsByName(productName: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getProductName/${productName}`);
  }


}
