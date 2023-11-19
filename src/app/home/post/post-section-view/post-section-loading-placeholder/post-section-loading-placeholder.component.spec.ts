import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSectionLoadingPlaceholderComponent } from './post-section-loading-placeholder.component';

describe('PostSectionLoadingPlaceholderComponent', () => {
  let component: PostSectionLoadingPlaceholderComponent;
  let fixture: ComponentFixture<PostSectionLoadingPlaceholderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostSectionLoadingPlaceholderComponent]
    });
    fixture = TestBed.createComponent(PostSectionLoadingPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
