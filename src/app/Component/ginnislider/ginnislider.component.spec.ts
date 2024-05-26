import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnisliderComponent } from './ginnislider.component';

describe('GinnisliderComponent', () => {
  let component: GinnisliderComponent;
  let fixture: ComponentFixture<GinnisliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnisliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnisliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
