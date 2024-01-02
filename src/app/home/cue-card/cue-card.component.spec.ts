import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CueCardComponent } from './cue-card.component';

describe('CueCardComponent', () => {
  let component: CueCardComponent;
  let fixture: ComponentFixture<CueCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CueCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
