import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniresetpasswordComponent } from './ginniresetpassword.component';

describe('GinniresetpasswordComponent', () => {
  let component: GinniresetpasswordComponent;
  let fixture: ComponentFixture<GinniresetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniresetpasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniresetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
