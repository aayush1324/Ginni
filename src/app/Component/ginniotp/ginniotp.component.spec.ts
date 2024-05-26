import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniotpComponent } from './ginniotp.component';

describe('GinniotpComponent', () => {
  let component: GinniotpComponent;
  let fixture: ComponentFixture<GinniotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniotpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
