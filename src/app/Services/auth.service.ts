import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://localhost:7132/api/User/';
  private userPayload:any;

  
  constructor(private http: HttpClient, private router: Router) { 
    this.userPayload = this.decodedToken();
  }

  signUp(userObj: any) {

    const userobject =  {
      UserName : userObj.username,
      Email  : userObj.email,
      Password : userObj.password,
      ConfirmPassword : userObj.confirmPassword,
      Phone : userObj.mobile.toString()
    };
    return this.http.post<any>(`${this.baseUrl}register`, userobject)
  }

  confirmSendEmail(email: string, token: string) {
    return this.http.get(`${this.baseUrl}confirm-email?email=${email}&token=${token}`);
  }

  signIn(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }


}
