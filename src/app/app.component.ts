import { Component, inject } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ginni';
  auth = inject(AuthService)
  ngOnInit(){
    var token = this.auth.getToken();
    if(token){
      this.auth.isLoggedInSubject.next(true);
    }
    else{
      this.auth.isLoggedInSubject.next(false);
    }
  }
}
