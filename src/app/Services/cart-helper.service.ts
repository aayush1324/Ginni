import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartHelperService {
  totalCartItem: number = 0;


  constructor(private router: Router, private cartService: CartService) { }


  getCartItems(): Observable<any[]> {
    const UserID = sessionStorage.getItem('UserID');
    if (!UserID) {
      console.error('User ID not found in session storage');
      return of([]); // Return an empty array if no user ID is found
    }

    return this.cartService.getToCarts(UserID).pipe(
      tap(res => {
        this.totalCartItem = res.length;
      }),
      catchError(err => {
        console.error('Error getting cart items:', err);
        return of([]); // Return an empty array in case of error
      })
    );
  }


  addToCart(userId: string, productId: string, products: any[]): Observable<any> {
    return this.cartService.addToCarts(userId, productId).pipe(
      tap(() => {
        alert('Item added to cart');
      }),
      catchError(err => {
        console.error('Error adding item to cart:', err);
        alert('Error adding item to cart');
        return of(null);
      })
    );
  }
  

  removeCartItem(userId: string, productId: string, products: any[]): Observable<any> {
    return this.cartService.removeItem(userId, productId).pipe(
      tap(() => {
        // const index = products.findIndex(item => item.productId === productId);
        // if (index !== -1) {
        //   products.splice(index, 1);
        // }
        alert('Item removed successfully');
      }),
      catchError(err => {
        console.error('Error removing item:', err);
        alert('Error removing item');
        return of(null);
      })
    );
  }


}
