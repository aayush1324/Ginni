import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniorderComponent } from './ginniorder.component';

describe('GinniorderComponent', () => {
  let component: GinniorderComponent;
  let fixture: ComponentFixture<GinniorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniorderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
