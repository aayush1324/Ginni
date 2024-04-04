import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelleraddproductComponent } from './selleraddproduct.component';

describe('SelleraddproductComponent', () => {
  let component: SelleraddproductComponent;
  let fixture: ComponentFixture<SelleraddproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelleraddproductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelleraddproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
