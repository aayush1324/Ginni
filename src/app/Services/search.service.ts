import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchTermSubject = new BehaviorSubject<string>('');
  
  searchTerm$: Observable<string> = this.searchTermSubject.asObservable();

  setSearchTerm(searchTerm: string) 
  {
    this.searchTermSubject.next(searchTerm);
  }

  getSearchTerm(): Observable<string> 
  {
    return this.searchTermSubject.asObservable();
  }

  getSearchVal(){
    return this.searchTermSubject.getValue();
  }
}
