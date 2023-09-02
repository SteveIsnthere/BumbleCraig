import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLoadingPlaceholderComponent } from './post-loading-placeholder.component';

describe('PostLoadingPlaceholderComponent', () => {
  let component: PostLoadingPlaceholderComponent;
  let fixture: ComponentFixture<PostLoadingPlaceholderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostLoadingPlaceholderComponent]
    });
    fixture = TestBed.createComponent(PostLoadingPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
