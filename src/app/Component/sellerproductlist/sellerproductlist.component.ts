import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../Services/address.service';
import { ProductService } from '../../Services/product.service';
import { Observable } from 'rxjs';
import { ImageService } from '../../Services/image.service';
import { HttpResponse } from '@angular/common/http';
import { error } from 'console';
import { url } from 'inspector';

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



  constructor(private fb: FormBuilder, private productService : ProductService, private imageService: ImageService) { }

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

  selectedImage: { file: File, url: string }[] = [];
  
  onFileSelecteds(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file); // Generate Blob URL from the selected file
      this.selectedImage.push({ file, url }); // Store the Blob URL in selectedImage array
    }
  }

  onDeleteImages(): void {
    this.selectedImage = []; // Clear the selectedImage array
  }

  
  
  selectedImages: { file: File, url: string }[] = [];

  onFilesSelected(event: any) {
    const filess: File[] = event.target.files;

    if (filess) {
      for (const file of filess) {
        const url = URL.createObjectURL(file);
          this.selectedImages.push({ file, url });
      }

      for (let i = 0; i < this.selectedImages.length; i++) {
            console.log(this.selectedImages[i]);
          }
    }
  }

  onDeleteImage(index: number) {
    this.selectedImages.splice(index, 1);
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

      // Retrieve form values
      const formData = this.productForm.value;

      // Assuming you want to set the URL of the first selected image in the form
      if (this.selectedImage.length > 0) {
        const imageUrl = this.selectedImage[0].url;
        formData.image = imageUrl; // Update the image field with the URL
      }

      console.log(formData);

      this.productService.addProducts(formData).subscribe({
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

      // Assuming this.selectedImages contains the selected images
      // const imageUrls = this.selectedImages.map(image => image.url);

      // console.log(imageUrls)
      // this.imageService.addImages(imageUrls).subscribe({
      //   next: (response) => {
      //     console.log(response);
      //     this.selectedImages = []
      //   },
      //   error: (errors) => {
      //     alert(errors?.error.message);
      //   }
      // });

    }
  }

  getProduct(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productlist = res;
        console.log(this.productlist);
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
