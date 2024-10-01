import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShimmerCardComponent } from './shimmer-card.component';

describe('ShimmerCardComponent', () => {
  let component: ShimmerCardComponent;
  let fixture: ComponentFixture<ShimmerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShimmerCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShimmerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
