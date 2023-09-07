import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFilesViewerComponent } from './post-files-viewer.component';

describe('PostFilesViewerComponent', () => {
  let component: PostFilesViewerComponent;
  let fixture: ComponentFixture<PostFilesViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostFilesViewerComponent]
    });
    fixture = TestBed.createComponent(PostFilesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
