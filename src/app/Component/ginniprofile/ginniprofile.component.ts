import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ginniprofile',
  templateUrl: './ginniprofile.component.html',
  styleUrl: './ginniprofile.component.css'
})
export class GinniprofileComponent {
  addressForm!: FormGroup; // Adding ! to indicate it will be initialized later
  isPopupOpen: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
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
