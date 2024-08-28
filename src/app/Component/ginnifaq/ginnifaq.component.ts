import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-ginnifaq',
  templateUrl: './ginnifaq.component.html',
  styleUrl: './ginnifaq.component.css'
})
export class GinnifaqComponent {
  faqs = [
    { question: 'Who are Ginni Dry Fruits?', answer: 'Ginni Dry Fruits is a family-owned business dedicated to providing the highest quality nuts, dried fruits, and seeds, sourced from the best farms and orchards around the world.', showAnswer: false },
    { question: 'How do I place an order?', answer: 'You can place an order through our website by selecting the products you wish to purchase, adding them to your cart, and following the checkout process.', showAnswer: false },
    { question: 'Do you have a physical store?', answer: 'Currently, we are an online store. However, our products are available for purchase on our website, and we deliver straight to your door.', showAnswer: false },
    { question: 'Can I buy your products in bulk?', answer: 'Yes, we offer bulk purchasing options. Please contact our sales team at admin@ginnidryfruits.com for more information.', showAnswer: false },
    { question: 'What payment methods do you accept?', answer: 'We accept various payment methods including credit/debit cards, PayPal, and other secure payment gateways.', showAnswer: false },

    // Add more FAQ items here
  ];

  toggleAnswer(faq: any, event: Event): void {
    // Close all FAQs first
    this.faqs.forEach(item => {
      if (item !== faq) {
        item.showAnswer = false; // Close all other FAQs
      }
    });

    // Toggle the clicked FAQ
    faq.showAnswer = !faq.showAnswer;
    event.stopPropagation(); // Prevent event bubbling
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Check if the clicked target is outside the FAQ items
    if (!target.closest('.faq')) {
      this.closeAllAnswers(); // Close all open answers if clicked outside
    }
  }

  closeAllAnswers(): void {
    this.faqs.forEach(faq => faq.showAnswer = false); // Close all open answers
  }
}
