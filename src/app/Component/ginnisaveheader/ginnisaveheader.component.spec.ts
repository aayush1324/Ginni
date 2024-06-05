import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnisaveheaderComponent } from './ginnisaveheader.component';

describe('GinnisaveheaderComponent', () => {
  let component: GinnisaveheaderComponent;
  let fixture: ComponentFixture<GinnisaveheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnisaveheaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnisaveheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
