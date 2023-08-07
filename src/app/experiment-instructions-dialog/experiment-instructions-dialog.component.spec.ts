import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentInstructionsDialogComponent } from './experiment-instructions-dialog.component';

describe('ExperimentInstructionsDialogComponent', () => {
  let component: ExperimentInstructionsDialogComponent;
  let fixture: ComponentFixture<ExperimentInstructionsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentInstructionsDialogComponent]
    });
    fixture = TestBed.createComponent(ExperimentInstructionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
