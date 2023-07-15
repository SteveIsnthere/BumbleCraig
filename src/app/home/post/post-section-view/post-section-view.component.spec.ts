import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSectionViewComponent } from './post-section-view.component';

describe('PostSectionViewComponent', () => {
  let component: PostSectionViewComponent;
  let fixture: ComponentFixture<PostSectionViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostSectionViewComponent]
    });
    fixture = TestBed.createComponent(PostSectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
