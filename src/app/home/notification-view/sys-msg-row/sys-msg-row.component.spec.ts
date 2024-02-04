import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysMsgRowComponent } from './sys-msg-row.component';

describe('SysMsgRowComponent', () => {
  let component: SysMsgRowComponent;
  let fixture: ComponentFixture<SysMsgRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [SysMsgRowComponent]
});
    fixture = TestBed.createComponent(SysMsgRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
