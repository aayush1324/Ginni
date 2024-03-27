import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ginnishippingpolicy',
  templateUrl: './ginnishippingpolicy.component.html',
  styleUrl: './ginnishippingpolicy.component.css'
})
export class GinnishippingpolicyComponent {
  constructor(private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
