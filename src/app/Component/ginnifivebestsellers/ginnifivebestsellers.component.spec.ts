import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnifivebestsellersComponent } from './ginnifivebestsellers.component';

describe('GinnifivebestsellersComponent', () => {
  let component: GinnifivebestsellersComponent;
  let fixture: ComponentFixture<GinnifivebestsellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnifivebestsellersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnifivebestsellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
