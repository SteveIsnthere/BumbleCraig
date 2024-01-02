import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSectionViewBaseComponent } from './post-section-view-base.component';

describe('PostSectionViewBaseComponent', () => {
  let component: PostSectionViewBaseComponent;
  let fixture: ComponentFixture<PostSectionViewBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostSectionViewBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostSectionViewBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
