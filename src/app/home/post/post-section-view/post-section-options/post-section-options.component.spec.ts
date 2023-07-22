import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSectionOptionsComponent } from './post-section-options.component';

describe('PostSectionOptionsComponent', () => {
  let component: PostSectionOptionsComponent;
  let fixture: ComponentFixture<PostSectionOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostSectionOptionsComponent]
    });
    fixture = TestBed.createComponent(PostSectionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
