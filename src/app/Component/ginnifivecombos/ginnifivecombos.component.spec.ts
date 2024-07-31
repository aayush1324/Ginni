import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnifivecombosComponent } from './ginnifivecombos.component';

describe('GinnifivecombosComponent', () => {
  let component: GinnifivecombosComponent;
  let fixture: ComponentFixture<GinnifivecombosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnifivecombosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnifivecombosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
