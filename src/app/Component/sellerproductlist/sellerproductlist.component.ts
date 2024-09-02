import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../Services/address.service';
import { ProductService } from '../../Services/product.service';
import { Observable } from 'rxjs';
import { ImageService } from '../../Services/image.service';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sellerproductlist',
  templateUrl: './sellerproductlist.component.html',
  styleUrl: './sellerproductlist.component.css'
})

export class SellerproductlistComponent implements OnInit {
  productForm! : FormGroup;
  isPopupOpen: boolean = false;
  isPopupView: boolean = false;
  isEdit: boolean = false;
  selectedproduct: any;
  productlist: any[] = [];
  selectedFile: File | null = null; // Initialize selectedFile with null
  selectedFiles: File | null = null; // Initialize selectedFile with null


    // Define your table headers
  // tableHeaders: string[] = [
  //   'profileImage', 'productName', 'description', 'url', 'price', 'discount', 
  //   'deliveryPrice', 'quantity', 'category','subcategory', 'weight', 'status',  
  // ];

  constructor(private fb: FormBuilder, private productService : ProductService, 
              private imageService: ImageService,private renderer: Renderer2,
              private toaster: ToastrService) { }

  @ViewChild('discountRupeeLabel') discountRupeeLabel!: ElementRef;
  @ViewChild('offerPriceLabel') offerPriceLabel!: ElementRef;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      MRPprice: ['', [Validators.required, Validators.min(0)]],
      discountPercent: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      discountRupee: [{ value: '', disabled: true }], // Disable this input to prevent manual changes
      discountCoupon: [''],
      deliveryPrice: ['', [Validators.required, Validators.min(0)]],
      offerPrice: [{ value: '', disabled: true }],
      quantity: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      weight: ['', Validators.required],
      stock: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      userRating: ['', [Validators.required, Validators.min(0)]],
    });

        
 // Automatically calculate the discount price whenever the MRP or discount percent changes
    this.productForm.get('MRPprice')?.valueChanges.subscribe(() => {
      this.calculateDiscountRupee();
      this.calculateOfferPrice();
      this.triggerLabelFocus();
    });
        
    this.productForm.get('discountPercent')?.valueChanges.subscribe(() => {
      this.calculateDiscountRupee();
      this.calculateOfferPrice(); 
    });

    this.getProducts();
  }


  // Method to calculate discount price based on MRPprice and discountPercent
  calculateDiscountRupee(): void {
    const MRPprice = this.productForm.get('MRPprice')?.value || 0;
    const discountPercent = this.productForm.get('discountPercent')?.value || 0;
    const discountRupee = (MRPprice * discountPercent) / 100;
    this.productForm.get('discountRupee')?.setValue(discountRupee.toFixed(0)); // Setting calculated value
  }

  calculateOfferPrice(): void {
    const MRPprice = this.productForm.get('MRPprice')?.value || 0;
    const discountRupee = this.productForm.get('discountRupee')?.value || 0;
    const offerPrice = MRPprice - discountRupee;
    this.productForm.get('offerPrice')?.setValue(offerPrice.toFixed(0)); // Setting calculated value
  }

  triggerLabelFocus(): void {
    // Manually trigger focus for related labels
    const controls = ['discountRupee', 'offerPrice'];
    controls.forEach(control => {
      const formControl = this.productForm.get(control);
      if (formControl?.value) {
        formControl.markAsTouched();
      }
    });
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
        // Append the form values to formData
        formData.append('productName', this.productForm.get('productName')!.value);
        formData.append('MRPprice', this.productForm.get('MRPprice')!.value);
        formData.append('discountPercent', this.productForm.get('discountPercent')!.value);
        formData.append('discountRupee', this.productForm.get('discountRupee')!.value);
        formData.append('discountCoupon', this.productForm.get('discountCoupon')!.value);
        formData.append('deliveryPrice', this.productForm.get('deliveryPrice')!.value);
        formData.append('offerPrice', this.productForm.get('offerPrice')!.value);
        formData.append('quantity', this.productForm.get('quantity')!.value);
        formData.append('description', this.productForm.get('description')!.value);
        formData.append('category', this.productForm.get('category')!.value);
        formData.append('subcategory', this.productForm.get('subcategory')!.value);
        formData.append('weight', this.productForm.get('weight')!.value);
        formData.append('stock', this.productForm.get('stock')!.value);
        formData.append('rating', this.productForm.get('rating')!.value);
        formData.append('userRating', this.productForm.get('userRating')!.value);
  
      this.productService.addProducts(formData).subscribe({
        next : (response) => {
          console.log(response);
          this.togglePopup();

          // alert(response.message);
          this.toaster.success(response.message, 'SUCCESS');

          this.productForm!.reset();
          this.selectedFile = null;
          this.getProducts();
        },
        error : (err) => {
          console.error(err);
          // alert(error?.error.message);
          this.toaster.error(err?.error.message, 'ERROR');
        }
    });
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
  

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (res: any[]) => { 
        console.log(res);
        this.productlist = res;       
        console.log(this.productlist);
           
         // Modify the imageData field for each item in the response
        // res.forEach(item => {
        //   if (item.imageData) {
        //     // Prepend 'data:image/jpeg;base64,' to the imageData field
        //     item.imageData = 'data:image/jpeg;base64,' + item.imageData;
        //   }
        // });
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
        // alert(res.message)
        this.toaster.success(res.message, "Success");

        console.log('Product deleted successfully!', res);
        this.getProducts();
      },
      error: (err) => {
        // console.error('Error deleting product:', err);
        this.toaster.error('Error deleting product:', err)
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
        MRPprice: product.mrpPrice,
        discountPercent: product.discountPercent,
        discountRupee: product.discountRupee,
        discountCoupon: product.discountCoupon,
        deliveryPrice: product.deliveryPrice,
        offerPrice: product.offerPrice,
        quantity: product.quantity,
        description: product.description,
        category: product.category,
        subcategory: product.subcategory,
        weight: product.weight,
        stock: product.stock,
        rating: product.rating,
        userRating: product.userRating,
      });
      // this.selectedImage = product.imageData; 
      console.log(this.productForm);
    }
  }

  submitEditedProduct(): void {
    if (this.productForm.valid) {
      const updatedProductData = new FormData();
        // Append form values to FormData
        updatedProductData.append('productName', this.productForm.get('productName')!.value);
        updatedProductData.append('MRPprice', this.productForm.get('MRPprice')!.value);
        updatedProductData.append('discountPercent', this.productForm.get('discountPercent')!.value);
        updatedProductData.append('discountRupee', this.productForm.get('discountRupee')!.value);
        updatedProductData.append('discountCoupon', this.productForm.get('discountCoupon')!.value);
        updatedProductData.append('deliveryPrice', this.productForm.get('deliveryPrice')!.value);
        updatedProductData.append('offerPrice', this.productForm.get('offerPrice')!.value);
        updatedProductData.append('quantity', this.productForm.get('quantity')!.value);
        updatedProductData.append('description', this.productForm.get('description')!.value);
        updatedProductData.append('category', this.productForm.get('category')!.value);
        updatedProductData.append('subcategory', this.productForm.get('subcategory')!.value);
        updatedProductData.append('weight', this.productForm.get('weight')!.value);
        updatedProductData.append('stock', this.productForm.get('stock')!.value);
        updatedProductData.append('rating', this.productForm.get('rating')!.value);
        updatedProductData.append('userRating', this.productForm.get('userRating')!.value);

       
      this.productService.editProducts(this.selectedproduct.id, updatedProductData).subscribe({
        next: (res) => {
          // alert(res.message);
          this.toaster.success(res.message, "Success")
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
