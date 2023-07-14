import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentSlidesComponent } from './experiment-slides.component';

describe('ExperimentSlidesComponent', () => {
  let component: ExperimentSlidesComponent;
  let fixture: ComponentFixture<ExperimentSlidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentSlidesComponent]
    });
    fixture = TestBed.createComponent(ExperimentSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
