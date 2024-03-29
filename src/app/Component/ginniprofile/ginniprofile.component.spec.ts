import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniprofileComponent } from './ginniprofile.component';

describe('GinniprofileComponent', () => {
  let component: GinniprofileComponent;
  let fixture: ComponentFixture<GinniprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
