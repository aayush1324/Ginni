import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerproductlistComponent } from './sellerproductlist.component';

describe('SellerproductlistComponent', () => {
  let component: SellerproductlistComponent;
  let fixture: ComponentFixture<SellerproductlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerproductlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerproductlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
