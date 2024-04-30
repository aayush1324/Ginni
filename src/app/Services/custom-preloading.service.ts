import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingService implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      // (route.path === 'home')
      // Load HomeComponent immediately
      return load();
    } else {
      // Preload other modules after HomeComponent
      return of(null);
    }
  }
}
