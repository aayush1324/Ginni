import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnidryfruitpistaComponent } from './ginnidryfruitpista.component';

describe('GinnidryfruitpistaComponent', () => {
  let component: GinnidryfruitpistaComponent;
  let fixture: ComponentFixture<GinnidryfruitpistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnidryfruitpistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnidryfruitpistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
