import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ginniprivacypolicy',
  templateUrl: './ginniprivacypolicy.component.html',
  styleUrl: './ginniprivacypolicy.component.css'
})
export class GinniprivacypolicyComponent {
  constructor(private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
