import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainbowStripComponent } from './rainbow-strip.component';

describe('RainbowStripComponent', () => {
  let component: RainbowStripComponent;
  let fixture: ComponentFixture<RainbowStripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RainbowStripComponent]
    });
    fixture = TestBed.createComponent(RainbowStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
