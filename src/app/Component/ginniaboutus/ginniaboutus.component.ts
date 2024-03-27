import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ginniaboutus',
  templateUrl: './ginniaboutus.component.html',
  styleUrl: './ginniaboutus.component.css'
})
export class GinniaboutusComponent {
  constructor(private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
