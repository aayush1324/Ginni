import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../Services/address.service';

@Component({
  selector: 'app-sellerproductlist',
  templateUrl: './sellerproductlist.component.html',
  styleUrl: './sellerproductlist.component.css'
})

export class SellerproductlistComponent {
  productForm! : FormGroup;
  isPopupOpen: boolean = false;
  isEdit: boolean = false;
  selectedproduct: any;
  productes: any[] = [];
  selectedFile: File | undefined;


  constructor(private fb: FormBuilder, private addressService: AddressService) { }

  ngOnInit(): void {

    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      url: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      product1: ['', Validators.required],
      product2: [''],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      image: [null, Validators.required], // Image is required
      default: [false]
    });
     // Set the default value explicitly
    this.productForm.get('default')?.setValue(false); 
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.productForm.get('image')?.setValue(file);
    }
  }

  togglePopup(): void {
    this.isPopupOpen = !this.isPopupOpen;
    this.isEdit = false; // Reset edit mode when opening the popup
    this.selectedproduct = null;
    this.resetForm();
  }

  resetForm(): void {
    this.productForm.reset();
  }

  addproduct(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.addressService.addAddress(this.productForm.value).subscribe({
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

  getAddresses(): void {
    this.addressService.getAddress().subscribe({
      next: (res) => {
        this.productes = res;
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }

  deleteAddress(addressId: string): void {
    this.addressService.deleteAddress(addressId).subscribe({
      next: (res) => {
        console.log('Address deleted successfully!', res);
        this.getAddresses();
      },
      error: (err) => {
        console.error('Error deleting address:', err);
      }
    });
  }

  openEditPopup(address: any): void {
    this.selectedproduct = address;
    this.populateForm(address);
    this.isPopupOpen = true;
    this.isEdit = true;
  }

  populateForm(address: any): void {
    this.productForm.patchValue({
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

  submitEditedproduct(): void {
    if (this.productForm.valid) {
      const updatedAddress = this.productForm.value;
      this.addressService.editAddress(this.selectedproduct.id, updatedAddress).subscribe({
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
