import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private baseUrl: string = 'https://ginnidryfruit.azurewebsites.net/api/Users/';
  private baseUrl: string = 'https://localhost:7132/api/Users/';

  private userPayload:any;
  
  private readonly TOKEN_KEY = 'token';
  private readonly EXPIRY_TIME_MS = 23 * 60 * 60 * 1000; // 10 minutes in milliseconds

  public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
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

  signUpGoogle (email : any, name :any){
    const userobject =  {
      UserName : name,
      Email  : email,
    };
    return this.http.post<any>(`${this.baseUrl}registerGoogle`, userobject)
  }

  confirmSendEmail(email: string, token: string) {
    return this.http.get(`${this.baseUrl}confirm-email?email=${email}&token=${token}`);
  }

  signIn(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  }

  signInGoogle(email : any){
    return this.http.post<any>(`${this.baseUrl}authenticateGoogle`, { email: email })
    .pipe(
      map(response => response.value) // This will map the response to only include the `value` property
    );

  }

  logout(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}logout?token=${token}`, {token}, {headers});
  }

  verifyOtps(emailOtp: string, phoneOtp: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}verifyOtps`, { emailOtp, phoneOtp });
  }

  // storeToken(tokenValue: string){
  //   sessionStorage.setItem('token', tokenValue)
  // }

  // storeRefreshToken(tokenValue: string){
  //   sessionStorage.setItem('refreshToken', tokenValue)
  // }

  // getToken(){
  //   return sessionStorage.getItem('token')
  // }

  // getRefreshToken(){
  //   return sessionStorage.getItem('refreshToken')
  // }



   // Function to store the token with expiration
   
   storeToken(tokenValue: string): void {
    const now = new Date();
    const expiryTime = now.getTime() + this.EXPIRY_TIME_MS;

    // Store the token and its expiry time in sessionStorage
    const tokenData = {
      value: tokenValue,
      expiry: expiryTime
    };
    
    sessionStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokenData));

    // sessionStorage.setItem('token', tokenValue);
    // sessionStorage.setItem('token_expiry', tokenValue)
    // sessionStorage.setItem(this.TOKEN_KEY, tokenValue);
    // sessionStorage.setItem(`${this.TOKEN_KEY}_expiry`, expiryTime.toString());


    // Set timeout to remove the token after 10 minutes
    setTimeout(() => {
      alert("Session is Expired !!! Please Login Again")
      window.location.reload();
      sessionStorage.clear();
      this.router.navigate([`/account/login`]);
    }, this.EXPIRY_TIME_MS);
  }

  // Function to get the token
  getToken(): string | null {
    const tokenStr = sessionStorage.getItem(this.TOKEN_KEY);

    // If token does not exist, return null
    if (!tokenStr) {
      return null;
    }

    // console.log(tokenStr);

    const tokenData = JSON.parse(tokenStr);
    const now = new Date();

    // console.log(tokenData);
    // console.log(now);

    // Check if the token has expired
    if (now.getTime() > tokenData.expiry) {
      // Token has expired, remove it
      // this.removeToken();
      sessionStorage.clear();
      this.router.navigate([''])
      return null;
    }

    return tokenData.value;
  }

  // removeToken(): void {
  //   sessionStorage.removeItem(this.TOKEN_KEY);
  //   sessionStorage.clear();
  // }


  isLoggedIn(): boolean{
    return !!sessionStorage.getItem('token')
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

  addCustomers(customer : any){
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}addCustomer`, customer, {headers});
  }

  getCustomers(){
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.baseUrl}getCustomer`, {headers}); 
  }

  editCustomers(customerId: string, updatedCustomer: any): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.baseUrl}editCustomer/${customerId}`, updatedCustomer, {headers});
  }

  deleteCustomers(customerId: string) {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseUrl}deleteCustomer/${customerId}`, {headers});
  }

}
