import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniofferresponseComponent } from './ginniofferresponse.component';

describe('GinniofferresponseComponent', () => {
  let component: GinniofferresponseComponent;
  let fixture: ComponentFixture<GinniofferresponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniofferresponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniofferresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
