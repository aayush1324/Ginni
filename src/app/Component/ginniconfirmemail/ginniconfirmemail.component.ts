import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ginniconfirmemail',
  templateUrl: './ginniconfirmemail.component.html',
  styleUrl: './ginniconfirmemail.component.css'
})
export class GinniconfirmemailComponent implements OnInit{

  email: string = '';
  token: string = '';
  confirmationStatus: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.token = params['token'] || '';

      if (this.email && this.token) {
        console.log(this.email);
        console.log(this.token);
        this.confirmEmail(this.email, this.token);
      } else {
        this.confirmationStatus = 'Email or token is missing.';
      }
    });
  }

  confirmEmail(email: string, token: string) {
    this.authService.confirmSendEmail(email, token).subscribe({
      next: response => {
        console.log('Email confirmed successfully!', response);
        this.confirmationStatus = 'Your email has been successfully confirmed.';
        // Set a timeout to navigate to another page after 10 seconds
        setTimeout(() => {
          this.router.navigate(['/main/ginnisignin']);
        }, 2000); // 10000 milliseconds = 10 seconds
      },

      error: error => {
        console.error('Error confirming email:', error);
        this.confirmationStatus = 'Error confirming email. Please try again later.';
      }
    });
  }
  
}
