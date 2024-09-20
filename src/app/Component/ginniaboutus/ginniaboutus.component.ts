import { Component } from '@angular/core';
import { Router } from '@angular/router';
console.log('aboutus')

@Component({
  selector: 'app-ginniaboutus',
  templateUrl: './ginniaboutus.component.html',
  styleUrl: './ginniaboutus.component.css'
})


export class GinniaboutusComponent {
  


  constructor(private router: Router) { 
    console.log('aboutus')
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    console.log('aboutus')
  }
}
