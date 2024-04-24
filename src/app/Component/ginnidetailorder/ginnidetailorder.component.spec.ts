import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnidetailorderComponent } from './ginnidetailorder.component';

describe('GinnidetailorderComponent', () => {
  let component: GinnidetailorderComponent;
  let fixture: ComponentFixture<GinnidetailorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnidetailorderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnidetailorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
