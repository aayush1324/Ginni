import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ginnitextandimage',
  templateUrl: './ginnitextandimage.component.html',
  styleUrl: './ginnitextandimage.component.css'
})


export class GinnitextandimageComponent {

  @Output() loaded = new EventEmitter<void>();

  ngOnInit(): void {

    // Simulate loading time
    setTimeout(() => {
      this.loaded.emit(); // Emit when loading is complete
    }, 1000); // Replace with actual loading logic 

    console.log("textnimageNG");
  }

  constructor(){
    console.log("textCO");

  }

}
