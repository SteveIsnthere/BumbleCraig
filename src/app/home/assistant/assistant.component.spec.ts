import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantComponent } from './assistant.component';

describe('AskTidderComponent', () => {
  let component: AssistantComponent;
  let fixture: ComponentFixture<AssistantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [AssistantComponent]
});
    fixture = TestBed.createComponent(AssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
