import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../Services/search.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchTerms: string = '';
  searchResults: any[] = [];

  searchTerm: string = '';
  searchTermSubscription: Subscription | undefined;
  searchResultss: any[] = [];


  constructor(private searchService: SearchService, private productService: ProductService) { }

  ngOnInit() { 
    window.scrollTo(0, 0);

     this.searchTerm = this.searchService.getSearchVal();

     this.searchTermSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.searchTerms = term;

      this.search();
    });
  }
    

  search(): void {
    //this.searchService.setSearchTerm(this.searchTerms);

    this.productService.searchProducts(this.searchTerms).subscribe({
      next : (res) => {
        this.searchResultss = res;
        console.log(this.searchResultss);
        this.searchResultss.forEach(item => {
          if (item.imageData) {
            // Prepend 'data:image/jpeg;base64,' to the imageData field
            item.imageData = 'data:image/jpeg;base64,' + item.imageData;
          }
        });
        console.log(this.searchResultss);
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }

  // onSearch() {
  //   this.searchService.setSearchTerm(this.searchTerm);
  // }

  // ngOnDestroy() {
  //   if (this.searchTermSubscription) {
  //     this.searchTermSubscription.unsubscribe();
  //   }
  // }

}
