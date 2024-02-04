import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMiniComponent } from './user-mini.component';

describe('UserMiniComponent', () => {
  let component: UserMiniComponent;
  let fixture: ComponentFixture<UserMiniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [UserMiniComponent]
});
    fixture = TestBed.createComponent(UserMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
