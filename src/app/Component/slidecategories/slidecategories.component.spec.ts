import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidecategoriesComponent } from './slidecategories.component';

describe('SlidecategoriesComponent', () => {
  let component: SlidecategoriesComponent;
  let fixture: ComponentFixture<SlidecategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlidecategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlidecategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
