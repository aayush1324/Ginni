import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnifilterComponent } from './ginnifilter.component';

describe('GinnifilterComponent', () => {
  let component: GinnifilterComponent;
  let fixture: ComponentFixture<GinnifilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnifilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnifilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
