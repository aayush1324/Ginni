import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnitrackComponent } from './ginnitrack.component';

describe('GinnitrackComponent', () => {
  let component: GinnitrackComponent;
  let fixture: ComponentFixture<GinnitrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnitrackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnitrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
