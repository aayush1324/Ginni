import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../Services/product.service';

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
  selectedFile: File | undefined;

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
      'PinCode', 'Delivery Type', 'Office Type', 'Office Name', 'Region Name', 'Division Name', 'District', 'State' 
    ];

    constructor(private fb: FormBuilder, private productService : ProductService, private formBuilder: FormBuilder) { }
  
    ngOnInit(): void {
      this.PincodeForm = this.formBuilder.group({
        pinCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        delivery: ['', Validators.required],
        officeType: ['', Validators.required],
        officeName: ['', Validators.required],
        regionName: ['', Validators.required],
        divisionName: ['', Validators.required],
        district: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required]
      });

      this.getProduct();
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
        this.productService.addProducts(this.PincodeForm.value).subscribe({
          next: (res) => {
            console.log(res.message);
            this.togglePopup();
            alert(res.message);
            this.getProduct();
          },
          error: (err) => {
            alert(err?.error.message);
          },
        });
      }
    }
  
    getProduct(): void {
      this.productService.getProducts().subscribe({
        next: (res) => {
          this.zipcodelist = res;
          console.log(this.zipcodelist);
        },
        error: (err) => {
          console.error('Error fetching addresses:', err);
        }
      });
    }
  
    deleteProduct(productId: string): void {
      this.productService.deleteProducts(productId).subscribe({
        next: (res) => {
          console.log('Product deleted successfully!', res);
          this.getProduct();
        },
        error: (err) => {
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
  
   populateForm(product: any): void {
    this.PincodeForm.patchValue({
      productName: product.productName,
      url: product.url,
      price: product.price,
      discount: product.discount,
      deliveryPrice: product.deliveryPrice,
      quantity: product.quantity,
      description: product.description,
      category: product.category,
      subcategory: product.subcategory,
      weight: product.weight,
      status: product.status
    });
  }
  
  
  submitEditedZipCode(): void {
      if (this.PincodeForm.valid) {
        const updatedProduct = this.PincodeForm.value;
        this.productService.editProducts(this.selectedzipcode.id, updatedProduct).subscribe({
          next: (res) => {
            console.log('Product updated successfully!', res);
            this.togglePopup();
            this.getProduct();
          },
          error: (err) => {
            console.error('Error updating Product:', err);
          }
        });
      }
    }
  
  
}
