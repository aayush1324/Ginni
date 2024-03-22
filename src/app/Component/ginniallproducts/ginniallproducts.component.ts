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
  
  almonds: Almond[] =  [
    { name: 'Almond', price: 1000, isBestSeller: true },
    { name: 'Almond', price: 1000, isBestSeller: false },
    { name: 'Almond', price: 1000, isBestSeller: false },
    { name: 'Almond', price: 1000, isBestSeller: false },
    { name: 'Almond', price: 1000, isBestSeller: false },
    { name: 'Almond', price: 1000, isBestSeller: false },
    // Add more almond items here
  ];

  get almondRows(): Almond[][] {
    const rows: Almond[][] = [];
    for (let i = 0; i < this.almonds.length; i += 4) {
        rows.push(this.almonds.slice(i, i + 4));
    }
    return rows;
  }
}
