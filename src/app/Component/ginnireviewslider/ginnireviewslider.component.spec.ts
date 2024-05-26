import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnireviewsliderComponent } from './ginnireviewslider.component';

describe('GinnireviewsliderComponent', () => {
  let component: GinnireviewsliderComponent;
  let fixture: ComponentFixture<GinnireviewsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnireviewsliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnireviewsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
