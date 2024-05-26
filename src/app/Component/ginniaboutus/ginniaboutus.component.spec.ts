import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniaboutusComponent } from './ginniaboutus.component';

describe('GinniaboutusComponent', () => {
  let component: GinniaboutusComponent;
  let fixture: ComponentFixture<GinniaboutusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniaboutusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniaboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
