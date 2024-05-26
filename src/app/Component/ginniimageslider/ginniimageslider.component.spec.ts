import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniimagesliderComponent } from './ginniimageslider.component';

describe('GinniimagesliderComponent', () => {
  let component: GinniimagesliderComponent;
  let fixture: ComponentFixture<GinniimagesliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniimagesliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniimagesliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
