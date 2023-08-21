import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendReqRowComponent } from './friend-req-row.component';

describe('FriendReqRowComponent', () => {
  let component: FriendReqRowComponent;
  let fixture: ComponentFixture<FriendReqRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FriendReqRowComponent]
    });
    fixture = TestBed.createComponent(FriendReqRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
