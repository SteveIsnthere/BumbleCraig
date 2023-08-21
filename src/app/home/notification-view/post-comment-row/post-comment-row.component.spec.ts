import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentRowComponent } from './post-comment-row.component';

describe('PostCommentRowComponent', () => {
  let component: PostCommentRowComponent;
  let fixture: ComponentFixture<PostCommentRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostCommentRowComponent]
    });
    fixture = TestBed.createComponent(PostCommentRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
