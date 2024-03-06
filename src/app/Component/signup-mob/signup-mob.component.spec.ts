import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupMobComponent } from './signup-mob.component';

describe('SignupMobComponent', () => {
  let component: SignupMobComponent;
  let fixture: ComponentFixture<SignupMobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupMobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupMobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
