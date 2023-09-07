import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableCommentsViewComponent } from './reusable-comments-view.component';

describe('ReusableCommentsViewComponent', () => {
  let component: ReusableCommentsViewComponent;
  let fixture: ComponentFixture<ReusableCommentsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReusableCommentsViewComponent]
    });
    fixture = TestBed.createComponent(ReusableCommentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
