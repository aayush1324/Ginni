import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-ginnisaveheader',
  templateUrl: './ginnisaveheader.component.html',
  styleUrl: './ginnisaveheader.component.css',

  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in')
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})

export class GinnisaveheaderComponent implements OnInit, OnDestroy {

  offers: string[] = [
    'Get 80% Discount on Purchase of 899 and Above With Code "SAVER8"',
    'Buy 2 Get 1 Free on All Electronics Items Today!',
    'Flat 50% Off on Fashion Apparels - Limited Time Offer'
  ];

  currentOffer: string = this.offers[0];
  slideState: string = 'in';
  private intervalId: any;

  ngOnInit(): void {
    this.startOfferRotation();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startOfferRotation(): void {
    let index = 0;
    this.intervalId = setInterval(() => {
      this.slideState = 'out';
      setTimeout(() => {
        index = (index + 1) % this.offers.length;
        this.currentOffer = this.offers[index];
        this.slideState = 'in';
      }, 3000); // Time for the slide-out animation
    }, 10000); // Interval in milliseconds (10 seconds)
  }
}
