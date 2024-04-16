import { Component } from '@angular/core';
import { SearchService } from '../../Services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  
  searchTerm: string = '';

  constructor(private searchService: SearchService) { }

  ngOnInit(): void { }

  onSearch() {
    this.searchService.setSearchTerm(this.searchTerm);
  }
}
