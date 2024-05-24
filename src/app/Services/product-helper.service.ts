import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductHelperService {

  constructor(private productService : ProductService) { }


  getProduct(): Observable<any[]> {
    const UserID = sessionStorage.getItem('UserID');
    
    if (UserID == null) {
      return this.productService.getProductsWithImages().pipe(
        map(res => {
          res.forEach(item => {
            if (item.imageData) {
              item.imageData = 'data:image/jpeg;base64,' + item.imageData;
            }
          });
          return res;
        })
      );
    } 
    else {
      return this.productService.getProductsWithImage(UserID).pipe(
        map(res => {
          res.forEach(item => {
            if (item.imageData) {
              item.imageData = 'data:image/jpeg;base64,' + item.imageData;
            }
          });
          return res;
        })
      );
    }
  }



  getProducts(UserID: string | null): Observable<any[]> {
    
    if (UserID === null) {
      return this.productService.getProductsWithImages().pipe(
        tap(res => this.processProductData(res)),
        catchError(err => {
          console.error('Error fetching products:', err);
          return of([]);
        })
      );
    } else {
      return this.productService.getProductsWithImage(UserID).pipe(
        tap(res => this.processProductData(res)),
        catchError(err => {
          console.error('Error fetching products:', err);
          return of([]);
        })
      );
    }
  }

  private processProductData(res: any[]): void {
    res.forEach(item => {
      if (item.imageData) {
        item.imageData = 'data:image/jpeg;base64,' + item.imageData;
      }
    });
  }
}
