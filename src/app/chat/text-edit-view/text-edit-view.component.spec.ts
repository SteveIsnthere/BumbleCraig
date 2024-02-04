import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditViewComponent } from './text-edit-view.component';

describe('TextEditViewComponent', () => {
  let component: TextEditViewComponent;
  let fixture: ComponentFixture<TextEditViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [TextEditViewComponent]
});
    fixture = TestBed.createComponent(TextEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
