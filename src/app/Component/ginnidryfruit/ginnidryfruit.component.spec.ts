import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnidryfruitComponent } from './ginnidryfruit.component';

describe('GinnidryfruitComponent', () => {
  let component: GinnidryfruitComponent;
  let fixture: ComponentFixture<GinnidryfruitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnidryfruitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnidryfruitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
