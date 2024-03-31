import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnideliveryComponent } from './ginnidelivery.component';

describe('GinnideliveryComponent', () => {
  let component: GinnideliveryComponent;
  let fixture: ComponentFixture<GinnideliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnideliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnideliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
