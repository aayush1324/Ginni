import { Component } from '@angular/core';

interface Almond {
  name: string;
  price: number;
  isBestSeller: boolean;
}

@Component({
  selector: 'app-ginniallproducts',
  templateUrl: './ginniallproducts.component.html',
  styleUrls: ['./ginniallproducts.component.css']
})
export class GinniallproductsComponent {
  isDropdownOpenAvailability: boolean = false;
  isDropdownOpenCategory: boolean = false;
  isDropdownOpenPricing: boolean = false;
  isDropdownOpenSortby: boolean = false;


  toggleDropdownAvailability() {
    this.isDropdownOpenAvailability = !this.isDropdownOpenAvailability;
  }

  toggleDropdownCategory() {
    this.isDropdownOpenCategory = !this.isDropdownOpenCategory;
  }

  toggleDropdownPricing() {
    this.isDropdownOpenPricing = !this.isDropdownOpenPricing;
  }

  toggleDropdownSortby() {
    this.isDropdownOpenSortby = !this.isDropdownOpenSortby;
  }
  
  almonds: Almond[] =  [
    { name: 'Almond', price: 1000, isBestSeller: true },
    { name: 'cashew', price: 1000, isBestSeller: false },
    { name: 'date', price: 1000, isBestSeller: false },
    { name: 'raisin', price: 1000, isBestSeller: false },
    { name: 'pista', price: 1000, isBestSeller: false },
    { name: 'walnut', price: 1000, isBestSeller: false },
    // Add more almond items here
    { name: 'Almond', price: 1000, isBestSeller: true },
    { name: 'cashew', price: 1000, isBestSeller: false },
    { name: 'date', price: 1000, isBestSeller: false },
    { name: 'raisin', price: 1000, isBestSeller: false },
    { name: 'pista', price: 1000, isBestSeller: false },
    { name: 'walnut', price: 1000, isBestSeller: false },
    { name: 'Almond', price: 1000, isBestSeller: true },
    { name: 'cashew', price: 1000, isBestSeller: false },
    { name: 'date', price: 1000, isBestSeller: false },
    { name: 'raisin', price: 1000, isBestSeller: false },
    { name: 'pista', price: 1000, isBestSeller: false },
    { name: 'walnut', price: 1000, isBestSeller: false },
    { name: 'Almond', price: 1000, isBestSeller: true },
    { name: 'cashew', price: 1000, isBestSeller: false },
    { name: 'date', price: 1000, isBestSeller: false },
    { name: 'raisin', price: 1000, isBestSeller: false },
    { name: 'pista', price: 1000, isBestSeller: false },
    { name: 'walnut', price: 1000, isBestSeller: false },
  ];

  currentPage = 1;

  // get almondRows(): Almond[][] {
  //   const rows: Almond[][] = [];
  //   for (let i = (this.currentPage - 1) * 20; i < this.almonds.length && i < this.currentPage * 20; i += 4) {
  //     rows.push(this.almonds.slice(i, i + 4));
  //   }
  //   return rows;
  // } 
  // get almondRows(): Almond[][] {
  //   const rows: Almond[][] = [];
  //   const itemsPerPage = 20;
  //   const itemsPerRow = 4;
  //   const startIndex = (this.currentPage - 1) * itemsPerPage;
  //   const endIndex = Math.min(startIndex + itemsPerPage, this.almonds.length);
  
  //   for (let i = startIndex; i < endIndex; i += itemsPerRow) {
  //     const row: Almond[] = [];
  //     for (let j = i; j < Math.min(i + itemsPerRow, endIndex); j++) {
  //       row.push(this.almonds[j]);
  //     }
  //     rows.push(row);
  //   }
  
  //   return rows;
  // }

  // get almondRows(): Almond[][] {
  //   const rows: Almond[][] = [];
  //   const itemsPerPage = 20;
  //   const itemsPerRow = 4;
  //   const startIndex = (this.currentPage - 1) * itemsPerPage;
  //   const endIndex = Math.min(startIndex + itemsPerPage, this.almonds.length);
  
  //   for (let i = startIndex; i < endIndex; i += itemsPerRow) {
  //     const row: Almond[] = [];
  //     for (let j = i; j < Math.min(i + itemsPerRow, endIndex); j++) {
  //       row.push(this.almonds[j]);
  //     }
  //     rows.push(row);
  //   }
  
  //   return rows;
  // }


  // nextPage(): void {
  //   if ((this.currentPage + 1) * 20 <= this.almonds.length) {
  //     this.currentPage++;
  //   }
  // }

  // prevPage(): void {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //   }
  // }
}
