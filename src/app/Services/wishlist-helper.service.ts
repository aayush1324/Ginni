import { Injectable } from '@angular/core';
import { WishlistService } from './wishlist.service';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistHelperService {
  totalWishlistItem: number = 0;

  constructor(private wishlistService: WishlistService, private router: Router) { }


  addToWishlist(userId: string, productId: string, products: any[]): Observable<any> {
    return this.wishlistService.addToWishlists(userId, productId).pipe(
      tap(() => {
        alert('Item added to wishlist');
      }),
      catchError(err => {
        console.error('Error adding item to wishlist:', err);
        alert('Error adding item to wishlist');
        return of(null);
      })
    );
  }

  getWishlistItems(): Observable<any[]> {
    const UserID = sessionStorage.getItem('UserID');
    if (!UserID) {
      console.error('User ID not found in session storage');
      return of([]); // Return an empty array if no user ID is found
    }

    return this.wishlistService.getToWishlists(UserID).pipe(
      tap(res => {
        this.totalWishlistItem = res.length;
      }),
      catchError(err => {
        console.error('Error getting wishlist items:', err);
        return of([]); // Return an empty array in case of error
      })
    );
  }

  removeWishlistItem(userId: string, productId: string, products: any[]): Observable<any> {
    return this.wishlistService.removeItems(userId, productId).pipe(
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
