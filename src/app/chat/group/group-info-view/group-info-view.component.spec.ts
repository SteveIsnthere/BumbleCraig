import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupInfoViewComponent } from './group-info-view.component';

describe('GroupInfoViewComponent', () => {
  let component: GroupInfoViewComponent;
  let fixture: ComponentFixture<GroupInfoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupInfoViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
