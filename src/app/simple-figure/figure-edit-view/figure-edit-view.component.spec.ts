import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigureEditViewComponent } from './figure-edit-view.component';

describe('FigureEditViewComponent', () => {
  let component: FigureEditViewComponent;
  let fixture: ComponentFixture<FigureEditViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [FigureEditViewComponent]
});
    fixture = TestBed.createComponent(FigureEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
