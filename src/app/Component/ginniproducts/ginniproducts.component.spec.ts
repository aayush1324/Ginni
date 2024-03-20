import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniproductsComponent } from './ginniproducts.component';

describe('GinniproductsComponent', () => {
  let component: GinniproductsComponent;
  let fixture: ComponentFixture<GinniproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
