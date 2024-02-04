import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupInvRowComponent } from './group-inv-row.component';

describe('GroupInvRowComponent', () => {
  let component: GroupInvRowComponent;
  let fixture: ComponentFixture<GroupInvRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [GroupInvRowComponent]
});
    fixture = TestBed.createComponent(GroupInvRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
