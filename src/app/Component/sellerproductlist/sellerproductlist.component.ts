import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../Services/address.service';
import { ProductService } from '../../Services/product.service';

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
  productlist: any[] = [];
  selectedFile: File | undefined;

    // Define your table headers
  tableHeaders: string[] = [
    'image', 'productName', 'description', 'url', 'price', 'discount', 
    'deliveryPrice', 'quantity', 'category','subcategory', 'weight', 'status',  
  ];



  constructor(private fb: FormBuilder, private productService : ProductService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      url: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      deliveryPrice: ['', Validators.required],
      quantity: ['', Validators.required],
      description: [''],
      category: ['sel', Validators.required],
      subcategory: ['sel', Validators.required],
      weight: ['sel', Validators.required],
      status: ['sel', Validators.required],
      image: [null, Validators.required] // Image is required
    });

    this.getProduct();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      console.log(file);
      console.log(event);
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

  addedProduct(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.productService.addProducts(this.productForm.value).subscribe({
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
        this.productlist = res;
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
    this.selectedproduct = product;
    this.populateForm(product);
    this.isPopupOpen = true;
    this.isEdit = true;
  }

 populateForm(product: any): void {
  this.productForm.patchValue({
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


  submitEditedProduct(): void {
    if (this.productForm.valid) {
      const updatedProduct = this.productForm.value;
      this.productService.editProducts(this.selectedproduct.id, updatedProduct).subscribe({
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
