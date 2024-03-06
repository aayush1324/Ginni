import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feature6Component } from './feature6.component';

describe('Feature6Component', () => {
  let component: Feature6Component;
  let fixture: ComponentFixture<Feature6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Feature6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Feature6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
