import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnifaqComponent } from './ginnifaq.component';

describe('GinnifaqComponent', () => {
  let component: GinnifaqComponent;
  let fixture: ComponentFixture<GinnifaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnifaqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnifaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
