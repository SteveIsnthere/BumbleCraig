import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFullViewComponent } from './post-full-view.component';

describe('PostFullViewComponent', () => {
  let component: PostFullViewComponent;
  let fixture: ComponentFixture<PostFullViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PostFullViewComponent]
});
    fixture = TestBed.createComponent(PostFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
