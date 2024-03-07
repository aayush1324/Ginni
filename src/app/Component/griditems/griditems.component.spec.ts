import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GriditemsComponent } from './griditems.component';

describe('GriditemsComponent', () => {
  let component: GriditemsComponent;
  let fixture: ComponentFixture<GriditemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GriditemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GriditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
