import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnibestsellersComponent } from './ginnibestsellers.component';

describe('GinnibestsellersComponent', () => {
  let component: GinnibestsellersComponent;
  let fixture: ComponentFixture<GinnibestsellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnibestsellersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnibestsellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
