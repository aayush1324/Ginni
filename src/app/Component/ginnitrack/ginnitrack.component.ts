import { Component, OnInit } from '@angular/core';
import { ZipcodeService } from '../../Services/zipcode.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ginnitrack',
  templateUrl: './ginnitrack.component.html',
  styleUrl: './ginnitrack.component.css'
})

export class GinnitrackComponent implements OnInit {
  zipCode!: string;
  isAvailable!: boolean;

  constructor(private zipcodeService: ZipcodeService) {}

  zipCodeFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]);

  ngOnInit(): void {
    this.zipCodeFormControl.valueChanges.subscribe(value => {
      if (value !== null) {
        this.zipCode = value;
      }
    });
  }

  checkAvailability() {
    if (this.zipCodeFormControl.valid && this.zipCode !== null) {
      this.zipcodeService.checkZipCode(this.zipCode)
        .subscribe(
          response => {
            this.isAvailable = response.available;
            console.log(response);
          },
          error => {
            console.error('Error checking zip code:', error);
            // Handle error (e.g., show error message)
          }
        );
    }
  }
}
