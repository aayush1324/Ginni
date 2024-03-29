import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnidryfruitcashewComponent } from './ginnidryfruitcashew.component';

describe('GinnidryfruitcashewComponent', () => {
  let component: GinnidryfruitcashewComponent;
  let fixture: ComponentFixture<GinnidryfruitcashewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnidryfruitcashewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnidryfruitcashewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
