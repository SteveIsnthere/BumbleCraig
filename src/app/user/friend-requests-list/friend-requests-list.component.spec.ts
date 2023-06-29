import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestsListComponent } from './friend-requests-list.component';

describe('FriendRequestsListComponent', () => {
  let component: FriendRequestsListComponent;
  let fixture: ComponentFixture<FriendRequestsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendRequestsListComponent]
    });
    fixture = TestBed.createComponent(FriendRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
