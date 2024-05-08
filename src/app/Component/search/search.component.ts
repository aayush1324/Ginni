import { Component } from '@angular/core';
import { SearchService } from '../../Services/search.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchTerms: string = '';
  searchResults: any[] = [];

  searchTerm: string = '';
  searchTermSubscription: Subscription | undefined;
  constructor(private searchService: SearchService, private productService: ProductService) { }

  ngOnInit() { 
     this.searchTerm = this.searchService.getSearchVal();
     this.searchTermSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.searchProducts();
    });
    }
    
  onSearch() {
    this.searchService.setSearchTerm(this.searchTerm);
  }

  searchProducts() {
    if (this.searchTerm) {
      this.productService.searchProducts(this.searchTerm).subscribe(products => {
        this.searchResults = products.slice(0, 3); // Limit to 3 results
      });
    } else {
      this.searchResults = [];
    }
  }
}
