import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../Models/resetPassword.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  // private baseUrl : string = "https://ginnidryfruit.azurewebsites.net/api/Users/";
  // private baseUrl : string = "https://localhost:7132/api/Users/";
  private baseUrl = environment.baseUrl + '/Users/';



  constructor(private http : HttpClient) { }

  sendResetPasswordLink(email : string){
    return this.http.post<any>(`${this.baseUrl}send-reset-email/${email}`,{});
  }

  resetPassword(resetPasswordObj : ResetPassword){
    return this.http.post<any>(`${this.baseUrl}reset-password`, resetPasswordObj)
  }

}
