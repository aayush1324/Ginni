import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ginnireturnpolicy',
  templateUrl: './ginnireturnpolicy.component.html',
  styleUrl: './ginnireturnpolicy.component.css'
})
export class GinnireturnpolicyComponent {

  constructor(private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
  
}
