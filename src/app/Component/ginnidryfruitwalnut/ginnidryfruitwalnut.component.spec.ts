import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnidryfruitwalnutComponent } from './ginnidryfruitwalnut.component';

describe('GinnidryfruitwalnutComponent', () => {
  let component: GinnidryfruitwalnutComponent;
  let fixture: ComponentFixture<GinnidryfruitwalnutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnidryfruitwalnutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnidryfruitwalnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
