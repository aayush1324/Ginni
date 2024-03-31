import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ginniaddress',
  templateUrl: './ginniaddress.component.html',
  styleUrl: './ginniaddress.component.css'
})
export class GinniaddressComponent {
  addressForm!: FormGroup; // Adding ! to indicate it will be initialized later
  isPopupOpen: boolean = false;
  showPlaceholder: boolean = true; // Declare showPlaceholder property

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      fname: ['', Validators.required], // First Name is required
      lname: ['', Validators.required], // Last Name is required
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Phone is required and should be 10 digits
      address1: ['', Validators.required], // Address 1 is required
      address2: [''], // Address 2 is optional
      pin: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]], // Pin Code is required and should be 6 digits
      city: ['', Validators.required], // City is required
      state: ['', Validators.required], // State is required
      default: [''] // Default Address is optional
    });
  }


  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
  }

  onSubmit() {
    if (this.addressForm.valid) {
      // Handle form submission
      console.log(this.addressForm.value);
      // Reset form and close popup
      this.addressForm.reset();
      this.togglePopup();
    }
  }
}
