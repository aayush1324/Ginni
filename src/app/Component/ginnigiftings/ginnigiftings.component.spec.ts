import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnigiftingsComponent } from './ginnigiftings.component';

describe('GinnigiftingsComponent', () => {
  let component: GinnigiftingsComponent;
  let fixture: ComponentFixture<GinnigiftingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnigiftingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnigiftingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
