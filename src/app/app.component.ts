import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;
  title = "Ginni"

  ngOnInit(): void {
    // Simulate a delay for the purpose of the animation
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Adjust delay as per your actual loading time
  }
}