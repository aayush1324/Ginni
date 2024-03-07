import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideproductsComponent } from './slideproducts.component';

describe('SlideproductsComponent', () => {
  let component: SlideproductsComponent;
  let fixture: ComponentFixture<SlideproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlideproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlideproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
