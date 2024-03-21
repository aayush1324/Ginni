import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnisigninComponent } from './ginnisignin.component';

describe('GinnisigninComponent', () => {
  let component: GinnisigninComponent;
  let fixture: ComponentFixture<GinnisigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnisigninComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnisigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
