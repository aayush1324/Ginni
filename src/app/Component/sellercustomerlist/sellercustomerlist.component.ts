import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ConfirmPasswordValidator } from '../../Helpers/confirmpassword.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sellercustomerlist',
  templateUrl: './sellercustomerlist.component.html',
  styleUrl: './sellercustomerlist.component.css'
})
export class SellercustomerlistComponent {

  customerForm! : FormGroup;
  customerEditForm! : FormGroup;
  // isEdit: boolean = false;
  selectedcustomer: any;
  customerlist: any[] = [];
  selectedFile: File | undefined;

  productForm! : FormGroup;
  isPopupOpen: boolean = false;
  isPopupEdit: boolean = false;
  isPopupView: boolean = false;

    // Define your table headers
  tableHeaders: string[] = [
    'userName', 'email', 'phone', 'role', 'phoneConfirmed', 
    'emailConfirmed', 'status'];

  renderer: any;



  constructor(private fb: FormBuilder, private authService: AuthService,
     private toaster: ToastrService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group(
      {
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        role: [null, Validators.required],
        phoneVerify: [null, Validators.required],
        emailVerify: [null, Validators.required],
        isLoggedIn: [null, Validators.required],
      },
      { validator: ConfirmPasswordValidator('password', 'confirmPassword') } // Apply password match validator only if not in edit mode
    );

    this.customerEditForm = this.fb.group({
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', []],
        role: [null, Validators.required],
        phoneVerify: [null, Validators.required],
        emailVerify: [null, Validators.required],
        isLoggedIn: [null, Validators.required],
      });

    this.getCustomer();
  }
  



  isDeleteModalOpen = false;
  selectedcustomerId: string | null = null;

  openDeleteConfirmation(customerId: string) {
    this.selectedcustomerId = customerId; // Store the product ID to delete
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
    if (this.selectedcustomerId !== null) {
      this.deleteCustomer(this.selectedcustomerId); // Call delete function
    }
    this.closeDeleteConfirmation(); // Close the modal
  }

  disableScrolling(): void {
    document.body.style.overflow = 'hidden';
  }

  enableScrolling(): void {
    document.body.style.overflow = 'auto';
  }
  
  togglePopup(): void {
    this.isPopupOpen = !this.isPopupOpen;
    this.selectedcustomer = null;
    this.resetForm();
  }

  toggleEdit(): void {
    this.isPopupEdit = !this.isPopupEdit;
    this.selectedcustomer = null;
    this.resetForm();
  }

  toggleView(): void {
    this.isPopupView = !this.isPopupView;
    this.selectedcustomer = null;
    this.resetForm();
  }
  
  resetForm(): void {
    this.customerForm.reset();
  }

  openEditPopup(customer: any): void {   
    this.selectedcustomer = customer;
    this.populateForm(customer);
    this.isPopupEdit = true;

    // Manage scrolling
    if (this.isPopupEdit) {
      this.disableScrolling();
    } else {
      this.enableScrolling();
    } 
  }

  openViewPopup(product: any): void {
    this.selectedcustomer = product;
    this.populateForm(product);
    this.isPopupView = true;

    // Manage scrolling
    if (this.isPopupView) {
      this.disableScrolling();
    } else {
      this.enableScrolling();
    } 
  }

  populateForm(customer: any): void {
    // Convert boolean values to '0' or '1'
    const phoneVerify = customer.phoneConfirmed ? 'true' : 'false';
    const emailVerify = customer.emailConfirmed ? 'true' : 'false';
    const isLoggedIn = customer.status ? 'true' : 'false';

    this.customerEditForm.patchValue({
      userName: customer.userName,
      email: customer.email,
      phone: customer.phone,
      role: customer.role,
      phoneVerify: phoneVerify, // Make sure the form control name matches exactly
      emailVerify: emailVerify, // Make sure the form control name matches exactly
      isLoggedIn: isLoggedIn    // Make sure the form control name matches exactly
    });
  }

  addedCustomer(): void {
    if (this.customerForm.valid) {
      // Extract the form values
      const newCustomerDatas = this.customerForm.value;

      // Initialize FormData
      const newCustomerData = new FormData();
      // Append form values to FormData
          newCustomerData.append('userName', this.customerForm.get('userName')!.value);
          newCustomerData.append('email', this.customerForm.get('email')!.value);
          newCustomerData.append('phone', this.customerForm.get('phone')!.value);
          newCustomerData.append('role', this.customerForm.get('role')!.value);
          newCustomerData.append('password', this.customerForm.get('password')!.value);
          newCustomerData.append('confirmPassword', this.customerForm.get('confirmPassword')!.value);
          newCustomerData.append('phoneVerify', this.customerForm.get('phoneVerify')!.value);
          newCustomerData.append('emailVerify', this.customerForm.get('emailVerify')!.value);
          newCustomerData.append('isLoggedIn', this.customerForm.get('isLoggedIn')!.value);
      
      this.authService.addCustomers(newCustomerData).subscribe({
        next: (res) => {
          const addedCustomer = res.customer; // Update this line if response structure differs

          const newCustomer = { id: res.id, ...this.customerForm.value };
          this.customerlist.push(newCustomer); // Add to the end of the list
  
          this.toaster.success(res.message, "Success");
          this.togglePopup(); // Close the popup after adding the customer
        },
        error: (err) => {
          console.error('Error adding customer:', err);
          this.toaster.error(err?.error.message, "Error");
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
        // Filter out the deleted customer from the list
        this.customerlist = this.customerlist.filter(customer => customer.id !== customerId);
  
        this.toaster.success('Customer deleted successfully!', "Success");
      },
      error: (err) => {
        console.error('Error deleting customer:', err);
        this.toaster.error('Error deleting customer.', "Error");
      }
    });
  }
  

  submitEditedCustomer(): void {
    if (this.customerEditForm.valid) {  
      console.log(this.customerEditForm);
      
      const updatedCustomer = this.customerEditForm.value;

      // Initialize FormData
      const updatedCustomerData = new FormData();
        // Append form values to FormData
        updatedCustomerData.append('userName', this.customerEditForm.get('userName')!.value);
        updatedCustomerData.append('email', this.customerEditForm.get('email')!.value);
        updatedCustomerData.append('phone', this.customerEditForm.get('phone')!.value);
        updatedCustomerData.append('role', this.customerEditForm.get('role')!.value);
        updatedCustomerData.append('phoneVerify', this.customerEditForm.get('phoneVerify')!.value);
        updatedCustomerData.append('emailVerify', this.customerEditForm.get('emailVerify')!.value);
        updatedCustomerData.append('isLoggedIn', this.customerEditForm.get('isLoggedIn')!.value);

     
      this.authService.editCustomers(this.selectedcustomer.id, updatedCustomerData).subscribe({
        next: (res) => {
          // console.log('Customer updated successfully!', res);
          this.toaster.success('Customer updated successfully!', "Success")
          
          // Find and update the customer directly in the list
          const index = this.customerlist.findIndex(c => c.id === this.selectedcustomer.id);
          if (index !== -1) {
            this.customerlist[index] = { ...this.customerlist[index], ...this.customerEditForm.value };
          }

          this.toggleEdit();
        },
        error: (err) => {
          this.toaster.error(err?.error.message, "Error");
          console.error('Error updating Customer:', err);
        }
      });
    }
  }



 
}
