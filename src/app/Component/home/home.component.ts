import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('Ginni Dry Fruits - Premium Dry Fruits and Nuts Online');
    this.meta.addTags([
      { name: 'description', content: 'Ginni Dry Fruits offers the best dry fruits and nuts. Shop premium almonds, cashews, raisins, and more online.' },
      { name: 'keywords', content: 'dry fruits, nuts, almonds, cashews, raisins, Ginni Dry Fruits' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Ginni Dry Fruits' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]);
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.title.setTitle('Ginni Dry Fruits - Premium Dry Fruits and Nuts Online');

    // Add Open Graph Tags
    this.meta.addTags([
      { property: 'og:title', content: 'Ginni Dry Fruits - Premium Dry Fruits and Nuts Online' },
      { property: 'og:description', content: 'Ginni Dry Fruits offers the best dry fruits and nuts. Shop premium almonds, cashews, raisins, and more online.' },
      { property: 'og:image', content: 'https://www.ginnidryfruits.com/assets/logo.jpg' },
      { property: 'og:url', content: 'https://www.ginnidryfruits.com' },
      { property: 'og:type', content: 'website' }
    ]);
  }
}
