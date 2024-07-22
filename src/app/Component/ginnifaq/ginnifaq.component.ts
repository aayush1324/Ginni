import { Component } from '@angular/core';

@Component({
  selector: 'app-ginnifaq',
  templateUrl: './ginnifaq.component.html',
  styleUrl: './ginnifaq.component.css'
})
export class GinnifaqComponent {
  faqs = [
    { question: 'Where can I buy Premium Dry fruits online?', answer: 'Ginni is the one-stop destination for premium dry fruits & nuts. Our products are made of 100% dry fruits & nuts. It is fresh and natural.', showAnswer: false },
    { question: 'Where can I buy Premium Dry fruits online and bulk?', answer: 'Ginni is the one-stop destination for premium dry fruits & nuts. Our products are made of 100% dry fruits & nuts. It is fresh and natural.', showAnswer: false },
    { question: 'Where can I buy Premium Dry fruits online?', answer: 'Ginni is the one-stop destination for premium dry fruits & nuts. Our products are made of 100% dry fruits & nuts. It is fresh and natural.', showAnswer: false },
    // Add more FAQ items here
  ];

  toggleAnswer(faq: any) {
    faq.showAnswer = !faq.showAnswer;
  }
}
