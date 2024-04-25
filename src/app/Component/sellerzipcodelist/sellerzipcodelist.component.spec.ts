import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerzipcodelistComponent } from './sellerzipcodelist.component';

describe('SellerzipcodelistComponent', () => {
  let component: SellerzipcodelistComponent;
  let fixture: ComponentFixture<SellerzipcodelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerzipcodelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerzipcodelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
