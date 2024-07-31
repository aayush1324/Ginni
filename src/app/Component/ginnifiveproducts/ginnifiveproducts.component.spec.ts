import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnifiveproductsComponent } from './ginnifiveproducts.component';

describe('GinnifiveproductsComponent', () => {
  let component: GinnifiveproductsComponent;
  let fixture: ComponentFixture<GinnifiveproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnifiveproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnifiveproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
