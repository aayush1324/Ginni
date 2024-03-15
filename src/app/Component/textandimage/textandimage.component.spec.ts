import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextandimageComponent } from './textandimage.component';

describe('TextandimageComponent', () => {
  let component: TextandimageComponent;
  let fixture: ComponentFixture<TextandimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextandimageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextandimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
