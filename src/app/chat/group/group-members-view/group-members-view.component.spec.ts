import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMembersViewComponent } from './group-members-view.component';

describe('GroupMembersViewComponent', () => {
  let component: GroupMembersViewComponent;
  let fixture: ComponentFixture<GroupMembersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupMembersViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupMembersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
