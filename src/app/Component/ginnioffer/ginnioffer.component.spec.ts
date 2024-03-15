import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniofferComponent } from './ginnioffer.component';

describe('GinniofferComponent', () => {
  let component: GinniofferComponent;
  let fixture: ComponentFixture<GinniofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniofferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
