import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorDisplayUsersComponent } from './professor-display-users.component';

describe('ProfessorDisplayUsersComponent', () => {
  let component: ProfessorDisplayUsersComponent;
  let fixture: ComponentFixture<ProfessorDisplayUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorDisplayUsersComponent]
    });
    fixture = TestBed.createComponent(ProfessorDisplayUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
