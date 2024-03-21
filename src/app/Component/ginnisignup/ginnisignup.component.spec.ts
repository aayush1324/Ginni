import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnisignupComponent } from './ginnisignup.component';

describe('GinnisignupComponent', () => {
  let component: GinnisignupComponent;
  let fixture: ComponentFixture<GinnisignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnisignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnisignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
