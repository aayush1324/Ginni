import { Component } from '@angular/core';

@Component({
  selector: 'app-ginnicustomerreview',
  templateUrl: './ginnicustomerreview.component.html',
  styleUrl: './ginnicustomerreview.component.css'
})
export class GinnicustomerreviewComponent {
    reviews: any[]  = [
      { feed : 'Lost your password? Please enter your username or email address Lost your password? Please enter your' , name : 'AAYUSHJI' },
      // { feed : 'Lost your password? Please enter your username or email address' , name : 'AAYUSH1'},
      // { feed : 'Lost your password? Please enter your username or email address' , name : 'AAYUSH2'},
      // { feed : 'Lost your password? Please enter your username or email address' , name : 'AAYUSH3'},
      // { feed : 'Lost your password? Please enter your username or email address' , name : 'AAYUSH4'},
    ]


    currentIndex = 0;
    startX = 0;
    startLeft = 0;
    dragging = false;

    constructor() {}

    onDragStart(event: MouseEvent) {
        this.dragging = true;
        this.startX = event.clientX;
        this.startLeft = this.currentIndex * -100;

        document.addEventListener('mousemove', this.onDrag.bind(this));
        document.addEventListener('mouseup', this.onDragEnd.bind(this));
    }

    onDrag(event: MouseEvent) {
        if (this.dragging) {
            const dx = event.clientX - this.startX;
            this.currentIndex = Math.max(0, Math.min(this.reviews.length - 1, Math.round(-this.startLeft / 100 + dx / 100)));
        }
    }

    onDragEnd() {
        this.dragging = false;
        document.removeEventListener('mousemove', this.onDrag.bind(this));
        document.removeEventListener('mouseup', this.onDragEnd.bind(this));
    }
}
