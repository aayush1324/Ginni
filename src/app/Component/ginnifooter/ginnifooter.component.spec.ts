import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnifooterComponent } from './ginnifooter.component';

describe('GinnifooterComponent', () => {
  let component: GinnifooterComponent;
  let fixture: ComponentFixture<GinnifooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnifooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnifooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
