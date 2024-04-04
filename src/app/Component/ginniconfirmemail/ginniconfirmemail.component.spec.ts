import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniconfirmemailComponent } from './ginniconfirmemail.component';

describe('GinniconfirmemailComponent', () => {
  let component: GinniconfirmemailComponent;
  let fixture: ComponentFixture<GinniconfirmemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniconfirmemailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniconfirmemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
