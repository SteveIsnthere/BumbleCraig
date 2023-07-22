import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPerceptionBarComponent } from './post-perception-bar.component';

describe('PostPerceptionBarComponent', () => {
  let component: PostPerceptionBarComponent;
  let fixture: ComponentFixture<PostPerceptionBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostPerceptionBarComponent]
    });
    fixture = TestBed.createComponent(PostPerceptionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
