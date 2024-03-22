import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnicontactusComponent } from './ginnicontactus.component';

describe('GinnicontactusComponent', () => {
  let component: GinnicontactusComponent;
  let fixture: ComponentFixture<GinnicontactusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnicontactusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnicontactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
