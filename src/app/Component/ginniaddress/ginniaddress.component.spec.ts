import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniaddressComponent } from './ginniaddress.component';

describe('GinniaddressComponent', () => {
  let component: GinniaddressComponent;
  let fixture: ComponentFixture<GinniaddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniaddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
