import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardThumbnail2Component } from './card-thumbnail2.component';

describe('CardThumbnail2Component', () => {
  let component: CardThumbnail2Component;
  let fixture: ComponentFixture<CardThumbnail2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardThumbnail2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardThumbnail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
