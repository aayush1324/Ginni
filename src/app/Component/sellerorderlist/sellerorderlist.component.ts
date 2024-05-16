import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../../Services/order.service';

@Component({
  selector: 'app-sellerorderlist',
  templateUrl: './sellerorderlist.component.html',
  styleUrl: './sellerorderlist.component.css'
})
export class SellerorderlistComponent {

  customerForm! : FormGroup;
  isPopupOpen: boolean = false;
  isEdit: boolean = false;
  selectedproduct: any;
  productlist: any[] = [];
  selectedFile: File | undefined;
  orders: any;


    // Define your table headers
  tableHeaders: string[] = [
    'name','email', 'mobile', 'orderId', 'orderDate', 'totalAmount', 'transactionId'];
  

  constructor(private fb: FormBuilder, private orderService : OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(
      (res) => {
        this.orders = res.value;
        console.log(this.orders);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  







  togglePopup(): void {
    this.isPopupOpen = !this.isPopupOpen;
    this.isEdit = false; // Reset edit mode when opening the popup
    this.selectedproduct = null;
    this.resetForm();
  }

  resetForm(): void {
    this.customerForm.reset();
  }


  openEditPopup(product: any): void {
    this.selectedproduct = product;
    this.populateForm(product);
    this.isPopupOpen = true;
    this.isEdit = true;
  }

  populateForm(product: any): void {
    this.customerForm.patchValue({
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

  addedCustomer(): void {
    // if (this.productForm.valid) {
    //   console.log(this.productForm.value);
    //   this.productService.addProducts(this.productForm.value).subscribe({
    //     next: (res) => {
    //       console.log(res.message);
    //       this.togglePopup();
    //       alert(res.message);
    //       this.getProduct();
    //     },
    //     error: (err) => {
    //       alert(err?.error.message);
    //     },
    //   });
    // }
  }

  // getProduct(): void {
  //   this.productService.getProducts().subscribe({
  //     next: (res) => {
  //       this.productlist = res;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching addresses:', err);
  //     }
  //   });
  // }

  deleteCustomer(productId: string): void {
    // this.productService.deleteProducts(productId).subscribe({
    //   next: (res) => {
    //     console.log('Product deleted successfully!', res);
    //     this.getProduct();
    //   },
    //   error: (err) => {
    //     console.error('Error deleting product:', err);
    //   }
    // });
  }

  submitEditedCustomer(): void {
    // if (this.productForm.valid) {
    //   const updatedProduct = this.productForm.value;
    //   this.productService.editProducts(this.selectedproduct.id, updatedProduct).subscribe({
    //     next: (res) => {
    //       console.log('Product updated successfully!', res);
    //       this.togglePopup();
    //       this.getProduct();
    //     },
    //     error: (err) => {
    //       console.error('Error updating Product:', err);
    //     }
    //   });
    // }
  }





}
