import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniallproductsComponent } from './ginniallproducts.component';

describe('GinniallproductsComponent', () => {
  let component: GinniallproductsComponent;
  let fixture: ComponentFixture<GinniallproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniallproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniallproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
