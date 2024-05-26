import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniforgotpasswordComponent } from './ginniforgotpassword.component';

describe('GinniforgotpasswordComponent', () => {
  let component: GinniforgotpasswordComponent;
  let fixture: ComponentFixture<GinniforgotpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniforgotpasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniforgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
