import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleFigureComponent } from './simple-figure.component';

describe('SimpleFigureComponent', () => {
  let component: SimpleFigureComponent;
  let fixture: ComponentFixture<SimpleFigureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleFigureComponent]
    });
    fixture = TestBed.createComponent(SimpleFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
