import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnishippingpolicyComponent } from './ginnishippingpolicy.component';

describe('GinnishippingpolicyComponent', () => {
  let component: GinnishippingpolicyComponent;
  let fixture: ComponentFixture<GinnishippingpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnishippingpolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnishippingpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
