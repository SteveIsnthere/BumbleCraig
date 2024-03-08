import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionBtnComponent } from './option-btn.component';

describe('OptionBtnComponent', () => {
  let component: OptionBtnComponent;
  let fixture: ComponentFixture<OptionBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
