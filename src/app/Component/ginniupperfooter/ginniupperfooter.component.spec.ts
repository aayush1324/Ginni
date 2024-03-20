import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniupperfooterComponent } from './ginniupperfooter.component';

describe('GinniupperfooterComponent', () => {
  let component: GinniupperfooterComponent;
  let fixture: ComponentFixture<GinniupperfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniupperfooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniupperfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
