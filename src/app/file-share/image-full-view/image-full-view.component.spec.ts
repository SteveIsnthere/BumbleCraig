import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFullViewComponent } from './image-full-view.component';

describe('ImageFullViewComponent', () => {
  let component: ImageFullViewComponent;
  let fixture: ComponentFixture<ImageFullViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageFullViewComponent]
    });
    fixture = TestBed.createComponent(ImageFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
