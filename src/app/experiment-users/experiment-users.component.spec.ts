import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentUsersComponent } from './experiment-users.component';

describe('ExperimentUsersComponent', () => {
  let component: ExperimentUsersComponent;
  let fixture: ComponentFixture<ExperimentUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentUsersComponent]
    });
    fixture = TestBed.createComponent(ExperimentUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
