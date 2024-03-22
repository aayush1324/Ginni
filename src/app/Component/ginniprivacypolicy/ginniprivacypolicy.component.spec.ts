import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinniprivacypolicyComponent } from './ginniprivacypolicy.component';

describe('GinniprivacypolicyComponent', () => {
  let component: GinniprivacypolicyComponent;
  let fixture: ComponentFixture<GinniprivacypolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinniprivacypolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinniprivacypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
