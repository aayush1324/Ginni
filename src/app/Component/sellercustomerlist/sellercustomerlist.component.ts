import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ConfirmPasswordValidator } from '../../Helpers/confirmpassword.validator';

@Component({
  selector: 'app-sellercustomerlist',
  templateUrl: './sellercustomerlist.component.html',
  styleUrl: './sellercustomerlist.component.css'
})
export class SellercustomerlistComponent {

  customerForm! : FormGroup;
  isPopupOpen: boolean = false;
  isEdit: boolean = false;
  selectedcustomer: any;
  customerlist: any[] = [];
  selectedFile: File | undefined;

    // Define your table headers
  tableHeaders: string[] = [
    'userName', 'email', 'phone', 'role', 'phoneConfirmed', 
    'emailConfirmed', 'status'];



  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      userName: ['', Validators.required],
      role: ['sel', Validators.required],
      phoneVerify: [null, Validators.required],
      emailVerify: [null, Validators.required],
      isLoggedIn: [null, Validators.required],
      // address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    },
      { validator: ConfirmPasswordValidator("password", "confirmPassword") }
      
    );
    
    this.getCustomer();
  }

  
  togglePopup(): void {
    this.isPopupOpen = !this.isPopupOpen;
    this.isEdit = false; // Reset edit mode when opening the popup
    this.selectedcustomer = null;
    this.resetForm();
  }

  resetForm(): void {
    this.customerForm.reset();
  }

  openEditPopup(customer: any): void {
    this.selectedcustomer = customer;
    this.populateForm(customer);
    this.isPopupOpen = true;
    this.isEdit = true;
  }

  populateForm(customer: any): void {
    // Convert boolean values to '0' or '1'
    const phoneVerify = customer.phoneConfirmed ? '1' : '0';
    const emailVerify = customer.emailConfirmed ? '1' : '0';
    const isLoggedIn = customer.status ? '1' : '0';

    this.customerForm.patchValue({
      userName: customer.userName,
      email: customer.email,
      phone: customer.phone,
      role: customer.role,
      phoneVerify: phoneVerify, // Make sure the form control name matches exactly
      emailVerify: emailVerify, // Make sure the form control name matches exactly
      isLoggedIn: isLoggedIn    // Make sure the form control name matches exactly
    });
  }

  addedCustomer() : void {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
      this.authService.addCustomers(this.customerForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.togglePopup();
          alert(res.message);
          this.getCustomer();
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
    }
  }

  getCustomer(): void {
    this.authService.getCustomers().subscribe({
      next: (res) => {
        this.customerlist = res;
        console.log(this.customerlist);
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }

  deleteCustomer(customerId: string): void {
    this.authService.deleteCustomers(customerId).subscribe({
      next: (res) => {
        console.log('customer deleted successfully!', res);
        this.getCustomer();
      },
      error: (err) => {
        console.error('Error deleting customer:', err);
      }
    });
  }

  submitEditedCustomer(): void {
    if (this.customerForm.valid) {
      const updatedCustomer = this.customerForm.value;
      this.authService.editCustomers(this.selectedcustomer.id, updatedCustomer).subscribe({
        next: (res) => {
          console.log('Product updated successfully!', res);
          this.togglePopup();
          this.getCustomer();
        },
        error: (err) => {
          console.error('Error updating Product:', err);
        }
      });
    }
  }



 
}
