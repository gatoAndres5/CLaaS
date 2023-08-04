import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentDisplayComponent } from './experiment-display.component';

describe('ExperimentDisplayComponent', () => {
  let component: ExperimentDisplayComponent;
  let fixture: ComponentFixture<ExperimentDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentDisplayComponent]
    });
    fixture = TestBed.createComponent(ExperimentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
