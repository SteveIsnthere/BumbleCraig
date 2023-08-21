import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLikeRowComponent } from './post-like-row.component';

describe('PostLikeRowComponent', () => {
  let component: PostLikeRowComponent;
  let fixture: ComponentFixture<PostLikeRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostLikeRowComponent]
    });
    fixture = TestBed.createComponent(PostLikeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
