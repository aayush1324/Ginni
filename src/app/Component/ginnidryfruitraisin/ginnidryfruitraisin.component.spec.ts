import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnidryfruitraisinComponent } from './ginnidryfruitraisin.component';

describe('GinnidryfruitraisinComponent', () => {
  let component: GinnidryfruitraisinComponent;
  let fixture: ComponentFixture<GinnidryfruitraisinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnidryfruitraisinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnidryfruitraisinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
