import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../Services/address.service';
import { ProductService } from '../../Services/product.service';
import { Observable } from 'rxjs';
import { ImageService } from '../../Services/image.service';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-sellerproductlist',
  templateUrl: './sellerproductlist.component.html',
  styleUrl: './sellerproductlist.component.css'
})

export class SellerproductlistComponent {
  productForm! : FormGroup;
  isPopupOpen: boolean = false;
  isPopupView: boolean = false;
  isEdit: boolean = false;
  selectedproduct: any;
  productlist: any[] = [];
  selectedFile: File | null = null; // Initialize selectedFile with null
  selectedFiles: File | null = null; // Initialize selectedFile with null


    // Define your table headers
  tableHeaders: string[] = [
    'profileImage', 'productName', 'description', 'url', 'price', 'discount', 
    'deliveryPrice', 'quantity', 'category','subcategory', 'weight', 'status',  
  ];

  constructor(private fb: FormBuilder, private productService : ProductService, 
              private imageService: ImageService,private renderer: Renderer2) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      url: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      deliveryPrice: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
      category: ['sel', Validators.required],
      subcategory: ['sel', Validators.required],
      weight: ['sel', Validators.required],
      status: ['sel', Validators.required],
      // image: [null, Validators.required] // Image is required
    });
    // this.getProduct();
    this.getProducts();
  }

isDeleteModalOpen = false;
selectedProductId: string | null = null;

openDeleteConfirmation(productId: string) {
  this.selectedProductId = productId; // Store the product ID to delete
  this.isDeleteModalOpen = true; // Show the modal

  // Manage scrolling
  if (this.isDeleteModalOpen) {
    this.disableScrolling();
  } else {
    this.enableScrolling();
  }
}

closeDeleteConfirmation() {
  this.isDeleteModalOpen = false; // Hide the modal
}

confirmDelete() {
  if (this.selectedProductId !== null) {
    this.deleteProduct(this.selectedProductId); // Call delete function
  }
  this.closeDeleteConfirmation(); // Close the modal
}


  togglePopup(): void {
    this.isPopupOpen = !this.isPopupOpen;
    this.renderer[this.isPopupOpen ? 'addClass' : 'removeClass'](document.body, 'no-scroll');


    this.isEdit = false; // Reset edit mode when opening the popup
    this.selectedproduct = null;
    this.resetForm();
  }

  toggleView(): void {
    this.isPopupView = !this.isPopupView;

  }


  resetForm(): void {
    this.productForm.reset();
    this.selectedImage = null;
    this.selectedImages = [];
  }

  selectedImage: string | ArrayBuffer | null = null; // Define a variable to hold the selected image data

  onFileChanged(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  onDeleteImage(): void {
    this.selectedImage = null;
  }


  selectedImages: { name: string, data: string | ArrayBuffer }[] = []; // Define a variable to hold the selected images and their names

  onFileChanges(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      // Iterate over each file and add it to selectedImages
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) { // Check if reader.result is not null
            // Push an object containing the file name and the loaded image data into the selectedImages array
            this.selectedImages.push({ name: files[i].name, data: reader.result });
          }
        };
        // Read the file as a data URL
        reader.readAsDataURL(files[i]);
      }
    }
  }
   
  onDeleteImages(index: number) {
    this.selectedImages.splice(index, 1); // Remove the image at the specified index
  }

 
  addedProduct() {
    // if (this.productForm && this.productForm.valid && this.selectedFile) {
    if (this.productForm && this.productForm.valid) {
      const formData = new FormData();
      formData.append('productName', this.productForm.get('productName')!.value);
      formData.append('url', this.productForm.get('url')!.value);
      formData.append('price', this.productForm.get('price')!.value);
      formData.append('discount', this.productForm.get('discount')!.value);
      formData.append('deliveryPrice', this.productForm.get('deliveryPrice')!.value);
      formData.append('quantity', this.productForm.get('quantity')!.value);
      formData.append('description', this.productForm.get('description')!.value);
      formData.append('category', this.productForm.get('category')!.value);
      formData.append('subcategory', this.productForm.get('subcategory')!.value);
      formData.append('weight', this.productForm.get('weight')!.value);
      formData.append('status', this.productForm.get('status')!.value);
      // formData.append('image', this.selectedFile);
  
      this.productService.addProducts(formData).subscribe(
        (response) => {
          console.log(response);
          const productId = response.productId; // Extract the product ID from the response
          // this.uploadImages(productId); 
          this.togglePopup();
          alert(response.message);
          this.productForm!.reset();
          this.selectedFile = null;
          this.getProducts();
        },
        (error) => {
          console.error(error);
          alert(error?.error.message);
        }
      );
    }
  }

  // Function to upload images with the product ID
  uploadImages(productId: string) {
    console.log(this.selectedImages);
    // Assuming imageService.addMultipleImages expects an array of images
    this.imageService.addMultipleImages(productId, this.selectedImages).subscribe(
      response => {
        console.log('Images uploaded successfully:', response);
        // Clear selected images after upload
        this.selectedImages = [];
      },
      error => {
        console.error('Error uploading images:', error);
      }
    );
  }
  

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res: any[]) => { // Assuming the response is an array of objects containing product and image data/
        console.log(res);
        this.productlist = res;
   
         // Modify the imageData field for each item in the response
        res.forEach(item => {
          if (item.imageData) {
            // Prepend 'data:image/jpeg;base64,' to the imageData field
            item.imageData = 'data:image/jpeg;base64,' + item.imageData;
          }
        });

        this.productlist = res;
        
        console.log(this.productlist);
      },
      error: (err) => {
        console.error('Error fetching products with images:', err);
      }
    });
  }


  deleteProduct(productId: string): void {
    console.log(productId);
    this.productService.deleteProducts(productId).subscribe({
      next: (res) => {
        alert(res.message)
        console.log('Product deleted successfully!', res);
        this.getProducts();
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

    // Manage scrolling
    if (this.isPopupOpen) {
      this.disableScrolling();
    } else {
      this.enableScrolling();
    }
  }

  openViewPopup(product: any): void {
    this.selectedproduct = product;
    this.populateForm(product);
    this.isPopupView = true;

    // Manage scrolling
    if (this.isPopupView) {
      this.disableScrolling();
    } else {
      this.enableScrolling();
    } 
  }


  disableScrolling(): void {
    document.body.style.overflow = 'hidden';
  }
  
  enableScrolling(): void {
    document.body.style.overflow = 'auto';
  }

  populateForm(product: any): void {
    if (this.productForm) {
      console.log(this.productForm);
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
        status: product.status,
      });
      this.selectedImage = product.imageData; // Set the selected image to be displayed
      console.log(this.productForm);
    }
  }

  submitEditedProduct(): void {
    if (this.productForm.valid && this.selectedFile) {
      const updatedProductData = new FormData();
      updatedProductData.append('productName', this.productForm.get('productName')!.value);
      updatedProductData.append('url', this.productForm.get('url')!.value);
      updatedProductData.append('price', this.productForm.get('price')!.value);
      updatedProductData.append('discount', this.productForm.get('discount')!.value);
      updatedProductData.append('deliveryPrice', this.productForm.get('deliveryPrice')!.value);
      updatedProductData.append('quantity', this.productForm.get('quantity')!.value);
      updatedProductData.append('description', this.productForm.get('description')!.value);
      updatedProductData.append('category', this.productForm.get('category')!.value);
      updatedProductData.append('subcategory', this.productForm.get('subcategory')!.value);
      updatedProductData.append('weight', this.productForm.get('weight')!.value);
      updatedProductData.append('status', this.productForm.get('status')!.value);
      updatedProductData.append('image', this.selectedFile);
  
      this.productService.editProducts(this.selectedproduct.id, updatedProductData).subscribe({
        next: (res) => {
          alert(res.message);
          console.log('Product updated successfully!', res);
          this.togglePopup();
          this.getProducts();
        },
        error: (err) => {
          console.error('Error updating Product:', err);
        }
      });
    } else {
      console.log('Form invalid or image not selected');
    }
  }
  
  
}
