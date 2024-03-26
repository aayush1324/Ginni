import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnimainproductComponent } from './ginnimainproduct.component';

describe('GinnimainproductComponent', () => {
  let component: GinnimainproductComponent;
  let fixture: ComponentFixture<GinnimainproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnimainproductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnimainproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
