import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewedPostsViewComponent } from './viewed-posts-view.component';

describe('ViewedPostsViewComponent', () => {
  let component: ViewedPostsViewComponent;
  let fixture: ComponentFixture<ViewedPostsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewedPostsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewedPostsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
