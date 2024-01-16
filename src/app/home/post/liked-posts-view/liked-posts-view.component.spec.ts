import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedPostsViewComponent } from './liked-posts-view.component';

describe('LikedPostsViewComponent', () => {
  let component: LikedPostsViewComponent;
  let fixture: ComponentFixture<LikedPostsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikedPostsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikedPostsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
