import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeImageProductComponent } from './large-image-product.component';

describe('LargeImageProductComponent', () => {
  let component: LargeImageProductComponent;
  let fixture: ComponentFixture<LargeImageProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LargeImageProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LargeImageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
