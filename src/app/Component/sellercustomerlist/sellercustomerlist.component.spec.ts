import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellercustomerlistComponent } from './sellercustomerlist.component';

describe('SellercustomerlistComponent', () => {
  let component: SellercustomerlistComponent;
  let fixture: ComponentFixture<SellercustomerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellercustomerlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellercustomerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
