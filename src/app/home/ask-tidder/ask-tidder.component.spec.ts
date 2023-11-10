import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskTidderComponent } from './ask-tidder.component';

describe('AskTidderComponent', () => {
  let component: AskTidderComponent;
  let fixture: ComponentFixture<AskTidderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AskTidderComponent]
    });
    fixture = TestBed.createComponent(AskTidderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
