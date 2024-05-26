import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ginnitermservice',
  templateUrl: './ginnitermservice.component.html',
  styleUrl: './ginnitermservice.component.css'
})
export class GinnitermserviceComponent {
  constructor(private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
