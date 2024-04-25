import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import { ZipcodeService } from '../../Services/zipcode.service';

@Component({
  selector: 'app-sellerzipcodelist',
  templateUrl: './sellerzipcodelist.component.html',
  styleUrl: './sellerzipcodelist.component.css'
})
export class SellerzipcodelistComponent {

  
  PincodeForm! : FormGroup;
  isPopupOpen: boolean = false;
  isEdit: boolean = false;
  selectedzipcode: any;
  zipcodelist: any[] = [];

  // Array of state names
  statesOfIndia: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
  ];
  
  // Define your table headers
  tableHeaders: string[] = [
    'pinCode', 'delivery', 'officeType', 'officeName', 'regionName', 'divisionName', 'district', 'state' 
  ];

  constructor(private fb: FormBuilder, private zipcodeService : ZipcodeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.PincodeForm = this.formBuilder.group({
      pinCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      delivery: ['sel', Validators.required],
      officeType: ['sel', Validators.required],
      officeName: ['', Validators.required],
      regionName: ['', Validators.required],
      divisionName: ['', Validators.required],
      district: ['', Validators.required],
      state: ['sel', Validators.required],
    });

    this.getZipCode();
  }
  
    
  togglePopup(): void {
    this.isPopupOpen = !this.isPopupOpen;
    this.isEdit = false; // Reset edit mode when opening the popup
    this.selectedzipcode = null;
    this.resetForm();
  }
  
  resetForm(): void {
    this.PincodeForm.reset();
  }
  
  addedZipCode(): void {
    if (this.PincodeForm.valid) {
      console.log(this.PincodeForm.value);
      this.zipcodeService.addZipcode(this.PincodeForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.togglePopup();
          console.log(res);
          alert(res.message);
          this.getZipCode();
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
    }
  }
  
  getZipCode(): void {
    this.zipcodeService.getAllZipCode().subscribe({
      next: (res) => {
        this.zipcodelist = res;
        console.log(this.zipcodelist);
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }
  
  deleteZipCode(zipcodeId: string): void {
    this.zipcodeService.deleteZipCode(zipcodeId).subscribe({
      next: (res: any) => {
        console.log('ZipCode deleted successfully!', res);
        this.getZipCode();
      },
      error: (err: any) => {
        console.error('Error deleting product:', err);
      }
    });
  }
  
  openEditPopup(product: any): void {
    this.selectedzipcode = product;
    this.populateForm(product);
    this.isPopupOpen = true;
    this.isEdit = true;
  }
  
  populateForm(zipcode: any): void {
    this.PincodeForm.patchValue({
      pinCode: zipcode.pinCode,
      delivery: zipcode.delivery,
      officeType: zipcode.officeType,
      officeName: zipcode.officeName,
      regionName: zipcode.regionName,
      divisionName: zipcode.divisionName,
      district: zipcode.district,
      state: zipcode.state
    });
  }


  submitEditedZipCode(): void {
      if (this.PincodeForm.valid) {
        const updatedZipCode = this.PincodeForm.value;
        this.zipcodeService.editZipCode(this.selectedzipcode.id, updatedZipCode).subscribe({
          next: (res) => {
            console.log('ZipCode updated successfully!', res);
            this.togglePopup();
            this.getZipCode();
          },
          error: (err) => {
            console.error('Error updating ZipCode:', err);
          }
        });
      }
  }
  
  
}
