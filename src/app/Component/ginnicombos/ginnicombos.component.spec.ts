import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnicombosComponent } from './ginnicombos.component';

describe('GinnicombosComponent', () => {
  let component: GinnicombosComponent;
  let fixture: ComponentFixture<GinnicombosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnicombosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnicombosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
