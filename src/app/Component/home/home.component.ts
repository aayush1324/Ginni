import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(){
    console.log('home')
  }

  ngOnInit() {
    window.scrollTo(0, 0);

     // Automatically load additional components after a delay
     setTimeout(() => {
      this.loadMore = true;
    }, 3000); // Load after 3 seconds (adjust as needed)
  }

  loadMore: boolean = false; // Initially set to false

  loadedComponents: boolean[] = [false, false, false, false, false, false, false, false, false]; // Track loaded components

  loadNextComponent(index: number) {
    this.loadedComponents[index] = true; // Mark the component as loaded
  }

}
