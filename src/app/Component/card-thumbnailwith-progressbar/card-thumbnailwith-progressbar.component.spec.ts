import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardThumbnailwithProgressbarComponent } from './card-thumbnailwith-progressbar.component';

describe('CardThumbnailwithProgressbarComponent', () => {
  let component: CardThumbnailwithProgressbarComponent;
  let fixture: ComponentFixture<CardThumbnailwithProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardThumbnailwithProgressbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardThumbnailwithProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
