import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnifivegiftingsComponent } from './ginnifivegiftings.component';

describe('GinnifivegiftingsComponent', () => {
  let component: GinnifivegiftingsComponent;
  let fixture: ComponentFixture<GinnifivegiftingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnifivegiftingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnifivegiftingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
