import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sellerdashboard',
  templateUrl: './sellerdashboard.component.html',
  styleUrl: './sellerdashboard.component.css'
})
export class SellerdashboardComponent {

  constructor(private router:Router) {  }

  isLinkActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

}
