import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnicustomerreviewComponent } from './ginnicustomerreview.component';

describe('GinnicustomerreviewComponent', () => {
  let component: GinnicustomerreviewComponent;
  let fixture: ComponentFixture<GinnicustomerreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnicustomerreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnicustomerreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
