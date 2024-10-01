import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ginniaboutus',
  templateUrl: './ginniaboutus.component.html',
  styleUrl: './ginniaboutus.component.css'
})
export class GinniaboutusComponent {
  constructor(private router: Router, private meta: Meta, private title: Title) { 
    console.log('aboutus')

    this.title.setTitle('About Us - Ginni Dry Fruits');
    this.meta.addTags([
      { name: 'description', content: 'Learn more about Ginni Dry Fruits, a leading provider of premium dry fruits and nuts.' },
      { name: 'keywords', content: 'about, Ginni Dry Fruits, dry fruits, nuts, company information' },
      { name: 'robots', content: 'index, follow' },
    ]);
  }


  ngOnInit() {
    window.scrollTo(0, 0);
    console.log('aboutus')
  }
}
