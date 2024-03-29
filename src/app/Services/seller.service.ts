import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http:HttpClient, private router:Router) { }

  sellerSignup(data : any) {
    console.log("service call signup");
    // return this.http.post('http://localhost:3000/seller', data)

    this.http.post('http://localhost:3000/seller', data, {observe:'response'})
      .subscribe((result)=>{
        console.log(result)
        if(result){
          localStorage.setItem('seller',JSON.stringify(result.body))
          this.router.navigate(['main/sellersignin'])
        }
      })
  }


  sellerSignin(data : any) {
    console.log("service call signin");
    // return this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`)

    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {observe:'response'})
      .subscribe((result:any)=>{
        console.warn(result)
        if(result && result.body && result.body.length===1){
          this.isLoginError.emit(false)
          localStorage.setItem('seller',JSON.stringify(result.body))
          this.router.navigate(['main/sellerhome'])
        }
        else{
          console.warn("login failed");
          this.isLoginError.emit(true)
        }     
      })
  }

}
