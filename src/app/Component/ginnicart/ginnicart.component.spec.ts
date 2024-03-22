import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnicartComponent } from './ginnicart.component';

describe('GinnicartComponent', () => {
  let component: GinnicartComponent;
  let fixture: ComponentFixture<GinnicartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnicartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnicartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
