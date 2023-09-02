import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupLoadingViewComponent } from './signup-loading-view.component';

describe('SignupLoadingViewComponent', () => {
  let component: SignupLoadingViewComponent;
  let fixture: ComponentFixture<SignupLoadingViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupLoadingViewComponent]
    });
    fixture = TestBed.createComponent(SignupLoadingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
