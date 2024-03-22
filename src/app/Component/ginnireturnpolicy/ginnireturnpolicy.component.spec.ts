import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnireturnpolicyComponent } from './ginnireturnpolicy.component';

describe('GinnireturnpolicyComponent', () => {
  let component: GinnireturnpolicyComponent;
  let fixture: ComponentFixture<GinnireturnpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnireturnpolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnireturnpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
