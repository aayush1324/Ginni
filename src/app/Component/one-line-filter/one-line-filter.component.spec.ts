import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneLineFilterComponent } from './one-line-filter.component';

describe('OneLineFilterComponent', () => {
  let component: OneLineFilterComponent;
  let fixture: ComponentFixture<OneLineFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneLineFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneLineFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
