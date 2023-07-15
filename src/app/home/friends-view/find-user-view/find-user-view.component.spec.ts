import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindUserViewComponent } from './find-user-view.component';

describe('FindUserViewComponent', () => {
  let component: FindUserViewComponent;
  let fixture: ComponentFixture<FindUserViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindUserViewComponent]
    });
    fixture = TestBed.createComponent(FindUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
