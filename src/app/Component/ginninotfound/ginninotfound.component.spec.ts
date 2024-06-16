import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinninotfoundComponent } from './ginninotfound.component';

describe('GinninotfoundComponent', () => {
  let component: GinninotfoundComponent;
  let fixture: ComponentFixture<GinninotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinninotfoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinninotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
