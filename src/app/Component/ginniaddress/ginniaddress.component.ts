import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../Services/address.service';
import { Router } from '@angular/router';
import { Console } from 'console';

@Component({
  selector: 'app-ginniaddress',
  templateUrl: './ginniaddress.component.html',
  styleUrl: './ginniaddress.component.css'
})
export class GinniaddressComponent {
  addressForm!: FormGroup; // Adding ! to indicate it will be initialized later
  isPopupOpen: boolean = false;
  showPlaceholder: boolean = true; // Declare showPlaceholder property
  addresses: any[] = []; // Array to store form values

  constructor(private fb: FormBuilder, private address: AddressService, private router : Router) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      firstname: ['', Validators.required], // First Name is required
      lastname: ['', Validators.required], // Last Name is required
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Phone is required and should be 10 digits
      address1: ['', Validators.required], // Address 1 is required
      address2: [''], // Address 2 is optional
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]], // Pin Code is required and should be 6 digits
      city: ['', Validators.required], // City is required
      state: ['', Validators.required], // State is required
      default: [false] // Default Address is optional
    });
    this.getAddresses(); // Fetch addresses when component initializes
  }

  // setDefault(event: any): void {
  //   const isChecked = event.target.checked;
  //   const defaultControl = this.addressForm.get('default');
  //   if (defaultControl) {
  //     defaultControl.setValue(isChecked);
  //   }
  // }



  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
  }

  getAddresses(): void {
    this.address.getAddress().subscribe({
      next: (res) => {
        this.addresses = res; // Assign fetched addresses to the component's addresses array
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }

  addAddress() : void  {
    if (this.addressForm.valid) {
      this.addresses.push(this.addressForm.value); // Add form value to the addresses array
      console.log(this.addressForm.value);

      this.address.addAddress(this.addressForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          console.log(this.addressForm.value);
          this.togglePopup();
          alert(res.message);
          alert("Address Added");
          this.addressForm.reset();
        },
        error: (err) => {
          alert(err?.error.message);
        },
      })
    }
  }




  deleteAddress(addressId: string): void {
    console.log('Deleting address with ID:', addressId);
    this.address.deleteAddress(addressId).subscribe(
      response => {
        console.log('Address deleted successfully!', response);
        // Optionally, remove the deleted address from the addresses array
        this.addresses = this.addresses.filter(address => address.id !== addressId);
      },
      error => {
        console.error('Error deleting address:', error);
        // Handle error response
      }
    );
  }


  updateAddress(addressId: string, updatedAddress: any) {
    this.address.editAddress(addressId, updatedAddress).subscribe(
      response => {
        console.log('Address updated successfully!', response);
        // Optionally, perform any additional actions upon successful update
      },
      error => {
        console.error('Error updating address:', error);
        // Handle error response
      }
    );
  }
}
