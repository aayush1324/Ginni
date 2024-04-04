import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-selleraddproduct',
  templateUrl: './selleraddproduct.component.html',
  styleUrl: './selleraddproduct.component.css'
})
export class SelleraddproductComponent implements OnInit{

  public users : any = [];

  constructor (private api : ApiService, private auth : AuthService){}

  ngOnInit() {
    this.api.getUsers().subscribe( res => {this.users = res});
  }

}
