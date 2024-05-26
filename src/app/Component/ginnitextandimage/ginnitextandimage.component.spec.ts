import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GinnitextandimageComponent } from './ginnitextandimage.component';

describe('GinnitextandimageComponent', () => {
  let component: GinnitextandimageComponent;
  let fixture: ComponentFixture<GinnitextandimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GinnitextandimageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GinnitextandimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
