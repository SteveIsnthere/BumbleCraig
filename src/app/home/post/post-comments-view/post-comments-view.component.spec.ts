import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentsViewComponent } from './post-comments-view.component';

describe('PostCommentsViewComponent', () => {
  let component: PostCommentsViewComponent;
  let fixture: ComponentFixture<PostCommentsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PostCommentsViewComponent]
});
    fixture = TestBed.createComponent(PostCommentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
