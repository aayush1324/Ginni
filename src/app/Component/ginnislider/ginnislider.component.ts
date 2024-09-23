import { Component, ElementRef, EventEmitter, OnInit, Output, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

@Pipe({ name: 'safeUrl' })
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-ginnislider',
  templateUrl: './ginnislider.component.html',
  styleUrls: ['./ginnislider.component.css'],
  providers: [SafeUrlPipe]
})

export class GinnisliderComponent implements OnInit {

  youtubeVideos = [
    { embedUrl: 'https://www.youtube.com/embed/SLV3NpKLOfo?si=Z2NokY8Qbm6GmZiD' },
    { embedUrl: 'https://www.youtube.com/embed/oUPMNMZds2g?si=i4UBW3jQJJESGVTK' },
    { embedUrl: 'https://www.youtube.com/embed/xSpKipeRK_4?si=uC-LvRvAWkSr7pmT' },
    { embedUrl: 'https://www.youtube.com/embed/bSMoWMhKsEw?si=ILIfwhHlVDzuDyiQ' },
    { embedUrl: 'https://www.youtube.com/embed/IWHINtY13bM?si=1mtSqJfJr4vhCF4I' },
    { embedUrl: 'https://www.youtube.com/embed/6DK6p3vcRDA?si=2IsOdieOD2rufLhq' },
    { embedUrl: 'https://www.youtube.com/embed/ot0mkR-f5Cw?si=qxSY7sYitJO-ld2u' },
    { embedUrl: 'https://www.youtube.com/embed/ruk4frZxgnY?si=HElk8qS_kO9bTeGk' }, 
    // Add more video objects here...
  ];

  visibleVideos: { embedUrl: SafeResourceUrl }[] = [];
  currentPage = 0;
  videosPerPage = 4;
  totalPages = 0;
  videoWidth = 250;
  videoHeight = 200;
  transitioning = false;
  private touchStartX: number = 0;
  private touchEndX: number = 0;

  @ViewChild('sliderContainer') sliderContainer!: ElementRef;

  constructor(private safeUrlPipe: SafeUrlPipe) {
    console.log("sliderCO");

   }
  
  @Output() loaded = new EventEmitter<void>();

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.youtubeVideos.length / this.videosPerPage);
    this.updateVisibleVideos();
    this.calculateVideoDimensions();

     // Simulate loading time
     setTimeout(() => {
      this.loaded.emit(); // Emit when loading is complete
    }, 1000); // Replace with actual loading logic
  
    console.log("sliderNG");

  }



  updateVisibleVideos(): void {
    const start = this.currentPage * this.videosPerPage;
    const end = start + this.videosPerPage;
    this.visibleVideos = this.youtubeVideos.slice(start, end).map(video => ({
      embedUrl: this.safeUrlPipe.transform(video.embedUrl)
    }));
  }

  calculateVideoDimensions(): void {
    const container = this.sliderContainer.nativeElement as HTMLElement;
    const containerWidth = container.offsetWidth;
    this.videoWidth = containerWidth / this.videosPerPage;
    this.videoHeight = (this.videoWidth * 9) / 16; // Maintain 16:9 aspect ratio
  }

  isHighlighted(index: number): boolean {
    const currentVideoIndex = this.currentPage * this.videosPerPage + index;
    return this.youtubeVideos[currentVideoIndex] === this.visibleVideos[0];
  }

  scroll(direction: number): void {
    if (this.transitioning) return;
    
    const newPage = Math.max(0, Math.min(this.currentPage + direction, this.totalPages - 1));
    if (newPage !== this.currentPage) {
      this.transitioning = true;
      this.currentPage = newPage;
      this.updateVisibleVideos();
      setTimeout(() => {
        this.transitioning = false;
      }, 1000); // Adjust timing based on transition duration
    }
  }

  nextSlide(): void {
    this.scroll(1);
  }

  previousSlide(): void {
    this.scroll(-1);
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchMove(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
  }

  onTouchEnd(): void {
    const minSwipeDistance = 20;
    if (this.touchStartX - this.touchEndX > minSwipeDistance) {
      this.nextSlide(); // Swipe left, move to next slide
    } else if (this.touchEndX - this.touchStartX > minSwipeDistance) {
      this.previousSlide(); // Swipe right, move to previous slide
    }
  }
}


  // instagramPosts: { url: string, thumbnail: string, alt: string }[] = [
  //   { url: 'https://www.instagram.com/reel/C2KA6obIfg3/?igsh=ODA4cGtxcmt2d2kw', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab2020d5226.jpg', alt: 'Instagram post with the caption: W' },
  //   { url: 'https://www.instagram.com/reel/C9zdmLmPgmz/?igsh=MWx3N3hwaWx4c2wxbg==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab205f91231.jpg', alt: 'Instagram post with the caption:' },
  //   { url: 'https://www.instagram.com/reel/C0a4WshoZrY/?igsh=MW94anF4ZG9ucXgybw==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab207b053cf.jpg', alt: 'Instagram post with the caption: .' },
  //   { url: 'https://www.instagram.com/reel/C2KA6obIfg3/?igsh=ODA4cGtxcmt2d2kw', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab2020d5226.jpg', alt: 'Instagram post with the caption: W' },
  //   { url: 'https://www.instagram.com/reel/C9zdmLmPgmz/?igsh=MWx3N3hwaWx4c2wxbg==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab205f91231.jpg', alt: 'Instagram post with the caption:' },
  //   { url: 'https://www.instagram.com/reel/C0a4WshoZrY/?igsh=MW94anF4ZG9ucXgybw==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab207b053cf.jpg', alt: 'Instagram post with the caption: .' },
  //   { url: 'https://www.instagram.com/reel/C2KA6obIfg3/?igsh=ODA4cGtxcmt2d2kw', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab2020d5226.jpg', alt: 'Instagram post with the caption: W' },
  //   { url: 'https://www.instagram.com/reel/C9zdmLmPgmz/?igsh=MWx3N3hwaWx4c2wxbg==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab205f91231.jpg', alt: 'Instagram post with the caption:' },
  //   { url: 'https://www.instagram.com/reel/C0a4WshoZrY/?igsh=MW94anF4ZG9ucXgybw==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab207b053cf.jpg', alt: 'Instagram post with the caption: .' },
  //   { url: 'https://www.instagram.com/reel/C2KA6obIfg3/?igsh=ODA4cGtxcmt2d2kw', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab2020d5226.jpg', alt: 'Instagram post with the caption: W' },
  //   { url: 'https://www.instagram.com/reel/C9zdmLmPgmz/?igsh=MWx3N3hwaWx4c2wxbg==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab205f91231.jpg', alt: 'Instagram post with the caption:' },
  //   { url: 'https://www.instagram.com/reel/C0a4WshoZrY/?igsh=MW94anF4ZG9ucXgybw==', thumbnail: 'https://reelsaver.io/thumbdata/thumb_66ab207b053cf.jpg', alt: 'Instagram post with the caption: .' },
  // ];

    // setCurrentIndex(index: number): void {
  //   this.currentIndex = index;
  // }

  // isHighlighted(index: number): boolean {
  //   return this.currentIndex === index;

  // }

  // scroll(direction: number): void {
  //   const container = this.sliderContainer.nativeElement as HTMLElement;
  //   const postWidth = container.offsetWidth * 2.5 / this.instagramPosts.length; 
  //   const scrollAmount = postWidth * direction;
  //   container.scrollLeft += scrollAmount;
  // }


 


