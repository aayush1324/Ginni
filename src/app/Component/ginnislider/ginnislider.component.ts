import { Component, OnInit } from '@angular/core';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-ginnislider',
  templateUrl: './ginnislider.component.html',
  styleUrl: './ginnislider.component.css'
})
export class GinnisliderComponent  {
  // var counter = 1;

  // setInterval(function() {
  //   document.getElementById('radio' + counter).checked = true
  //   counter++;

  //   if(counter > 4){
  //     counter =1;
  //   }
  // }, 5000);

  // counter: number = 0;

  // constructor() { }

  // ngOnInit(): void {
  //   this.startSlideInterval();
  // }

  // startSlideInterval() {
  //   interval(5000)
  //     .pipe(take(4)) // Adjust the number of slides accordingly
  //     .subscribe(() => {
  //       this.counter = (this.counter + 1) % 4; // Adjust the number of slides accordingly
  //     });
  // }

}
