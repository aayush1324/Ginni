import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersigninComponent } from './sellersignin.component';

describe('SellersigninComponent', () => {
  let component: SellersigninComponent;
  let fixture: ComponentFixture<SellersigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellersigninComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellersigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
