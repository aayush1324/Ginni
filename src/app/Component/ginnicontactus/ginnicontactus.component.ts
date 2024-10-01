import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ginnicontactus',
  templateUrl: './ginnicontactus.component.html',
  styleUrl: './ginnicontactus.component.css'
})
export class GinnicontactusComponent {
  constructor(private router: Router,private meta: Meta, private title: Title) {     
    console.log('contactus');

   
      this.title.setTitle('Contact Us - Ginni Dry Fruits');
      this.meta.addTags([
        { name: 'description', content: 'Get in touch with Ginni Dry Fruits for inquiries about our premium dry fruits and nuts.' },
        { name: 'keywords', content: 'contact, Ginni Dry Fruits, dry fruits, customer service' },
        { name: 'robots', content: 'index, follow' },
      ]);
    
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
