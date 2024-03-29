import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnidryfruitalmondComponent } from './ginnidryfruitalmond.component';

describe('GinnidryfruitalmondComponent', () => {
  let component: GinnidryfruitalmondComponent;
  let fixture: ComponentFixture<GinnidryfruitalmondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnidryfruitalmondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnidryfruitalmondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
