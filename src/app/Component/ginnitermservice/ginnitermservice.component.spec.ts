import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnitermserviceComponent } from './ginnitermservice.component';

describe('GinnitermserviceComponent', () => {
  let component: GinnitermserviceComponent;
  let fixture: ComponentFixture<GinnitermserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnitermserviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnitermserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
