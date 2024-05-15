import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../Services/address.service';

@Component({
  selector: 'app-ginniaddress',
  templateUrl: './ginniaddress.component.html',
  styleUrls: ['./ginniaddress.component.css']
})
export class GinniaddressComponent implements OnInit {
  addressForm! : FormGroup;
  isPopupOpen: boolean = false;
  isEdit: boolean = false;
  selectedAddress: any;
  addresses: any[] = [];

  constructor(private fb: FormBuilder, private addressService: AddressService) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address1: ['', Validators.required],
      address2: [''],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      default: [false]
    });
     // Set the default value explicitly
    this.addressForm.get('default')?.setValue(false);
    
    this.getAddresses();
  }

  togglePopup(): void {
    this.isPopupOpen = !this.isPopupOpen;
    this.isEdit = false; // Reset edit mode when opening the popup
    this.selectedAddress = null;
    this.resetForm();
  }

  resetForm(): void {
    this.addressForm.reset();
  }




  addAddress(): void {
    const UserID = sessionStorage.getItem('UserID');

    if(UserID !== null){
      if (this.addressForm.valid) {
        console.log(this.addressForm.value);
        this.addressService.addAddress(UserID,this.addressForm.value).subscribe({
          next: (res) => {
            console.log(res.message);
            this.togglePopup();
            alert(res.message);
            this.getAddresses();
          },
          error: (err) => {
            alert(err?.error.message);
          },
        });
      }
    }
  }

 

  getAddresses(): void {
    const UserID = sessionStorage.getItem('UserID');

    if(UserID !== null){
      this.addressService.getAddress(UserID).subscribe({
        next: (res) => {
          console.log(res);
          this.addresses = res;
        },
        error: (err) => {
          console.error('Error fetching addresses:', err);
        }
      });
    }
  }



  openEditPopup(address: any): void {
    this.selectedAddress = address;
    this.populateForm(address);
    this.isPopupOpen = true;
    this.isEdit = true;
  }

  populateForm(address: any): void {
    this.addressForm.patchValue({
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      address1: address.address1,
      address2: address.address2,
      pincode: address.pincode,
      city: address.city,
      state: address.state,
      default: address.default
    });
  }

  submitEditedAddress(): void {
    const UserID = sessionStorage.getItem('UserID');

    if(UserID !== null){
      if (this.addressForm.valid) {
        const updatedAddress = this.addressForm.value;
        this.addressService.editAddress(UserID, this.selectedAddress.id, updatedAddress).subscribe({
          next: (res) => {
            console.log('Address updated successfully!', res);
            this.togglePopup();
            this.getAddresses();
          },
          error: (err) => {
            console.error('Error updating address:', err);
          }
        });
      }
    }
  }



  deleteAddress(addressId: string): void {
    const UserID = sessionStorage.getItem('UserID');

    if(UserID !== null){
      this.addressService.deleteAddress(UserID, addressId).subscribe({
        next: (res) => {
          alert(res.message);
          console.log('Address deleted successfully!', res);
          this.getAddresses();
        },
        error: (err) => {
          console.error('Error deleting address:', err);
        }
      });
    }
  }


}
