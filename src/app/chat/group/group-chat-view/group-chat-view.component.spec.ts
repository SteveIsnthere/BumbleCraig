import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChatViewComponent } from './group-chat-view.component';

describe('GroupChatViewComponent', () => {
  let component: GroupChatViewComponent;
  let fixture: ComponentFixture<GroupChatViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupChatViewComponent]
    });
    fixture = TestBed.createComponent(GroupChatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
