import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSetUpComponent } from './user-set-up.component';

describe('UserSetUpComponent', () => {
  let component: UserSetUpComponent;
  let fixture: ComponentFixture<UserSetUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [UserSetUpComponent]
});
    fixture = TestBed.createComponent(UserSetUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
