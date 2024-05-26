import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniwishlistComponent } from './ginniwishlist.component';

describe('GinniwishlistComponent', () => {
  let component: GinniwishlistComponent;
  let fixture: ComponentFixture<GinniwishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniwishlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniwishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
