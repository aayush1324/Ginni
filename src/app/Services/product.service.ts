import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // private baseUrl: string = 'https://ginnidryfruit.azurewebsites.net/api/Products/';
  // private baseUrl: string = 'https://localhost:7132/api/Products/';
  private baseUrl = environment.baseUrl + '/Products/';

  private productItems = new BehaviorSubject<any>(null);
  productItems$ = this.productItems.asObservable();
  
  constructor(private http: HttpClient, private router: Router) { }

  updateProductItem(item: any) {
    this.productItems.next(item);
  }
  getProductsWithImage(UserID: string | null): Observable<any[]> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.baseUrl}getProductsWithImage/${UserID}`, {headers});
  }

  getProductsWithImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}getProductsWithImages`);
  }


  addProducts(formData: FormData): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}addProductsWithImages`, formData, {headers});
  }


  editProducts(productId: string, updatedProduct: any): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.baseUrl}editProduct/${productId}`, updatedProduct, {headers});
  }


  deleteProducts(productId: string) {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseUrl}deleteProduct/${productId}`, {headers});
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
