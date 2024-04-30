import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ginnicontactus',
  templateUrl: './ginnicontactus.component.html',
  styleUrl: './ginnicontactus.component.css'
})
export class GinnicontactusComponent {
  constructor(private router: Router) {     
    console.log('contactus')
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
