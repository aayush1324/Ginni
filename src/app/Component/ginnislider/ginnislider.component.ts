import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ginnislider',
  templateUrl: './ginnislider.component.html',
  styleUrls: ['./ginnislider.component.css']
})
export class GinnisliderComponent implements OnInit {
  instagramPosts: { url: string, thumbnail: string, alt: string }[] = [
    { url: 'https://www.instagram.com/reel/C2KA6obIfg3/?igsh=ODA4cGtxcmt2d2kw', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab2020d5226.jpg', alt: 'Instagram post with the caption: W' },
    { url: 'https://www.instagram.com/reel/C9zdmLmPgmz/?igsh=MWx3N3hwaWx4c2wxbg==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab205f91231.jpg', alt: 'Instagram post with the caption:' },
    { url: 'https://www.instagram.com/reel/C0a4WshoZrY/?igsh=MW94anF4ZG9ucXgybw==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab207b053cf.jpg', alt: 'Instagram post with the caption: .' },
    { url: 'https://www.instagram.com/reel/C2KA6obIfg3/?igsh=ODA4cGtxcmt2d2kw', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab2020d5226.jpg', alt: 'Instagram post with the caption: W' },
    { url: 'https://www.instagram.com/reel/C9zdmLmPgmz/?igsh=MWx3N3hwaWx4c2wxbg==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab205f91231.jpg', alt: 'Instagram post with the caption:' },
    { url: 'https://www.instagram.com/reel/C0a4WshoZrY/?igsh=MW94anF4ZG9ucXgybw==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab207b053cf.jpg', alt: 'Instagram post with the caption: .' },
    { url: 'https://www.instagram.com/reel/C2KA6obIfg3/?igsh=ODA4cGtxcmt2d2kw', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab2020d5226.jpg', alt: 'Instagram post with the caption: W' },
    { url: 'https://www.instagram.com/reel/C9zdmLmPgmz/?igsh=MWx3N3hwaWx4c2wxbg==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab205f91231.jpg', alt: 'Instagram post with the caption:' },
    { url: 'https://www.instagram.com/reel/C0a4WshoZrY/?igsh=MW94anF4ZG9ucXgybw==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab207b053cf.jpg', alt: 'Instagram post with the caption: .' },
    { url: 'https://www.instagram.com/reel/C2KA6obIfg3/?igsh=ODA4cGtxcmt2d2kw', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab2020d5226.jpg', alt: 'Instagram post with the caption: W' },
    { url: 'https://www.instagram.com/reel/C9zdmLmPgmz/?igsh=MWx3N3hwaWx4c2wxbg==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab205f91231.jpg', alt: 'Instagram post with the caption:' },
    { url: 'https://www.instagram.com/reel/C0a4WshoZrY/?igsh=MW94anF4ZG9ucXgybw==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab207b053cf.jpg', alt: 'Instagram post with the caption: .' },
 
  ];

  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  currentIndex = 0;

  constructor() { }

  ngOnInit(): void { }

  setCurrentIndex(index: number): void {
    this.currentIndex = index;
  }

  isHighlighted(index: number): boolean {
    return this.currentIndex === index;
  }

  scroll(direction: number): void {
    const container = this.sliderContainer.nativeElement as HTMLElement;
    const postWidth = container.offsetWidth * 2.5 / this.instagramPosts.length; // Assuming equal width for each post
    const scrollAmount = postWidth * direction;
    container.scrollLeft += scrollAmount;
  }
}
