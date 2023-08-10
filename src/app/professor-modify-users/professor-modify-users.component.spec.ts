import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorModifyUsersComponent } from './professor-modify-users.component';

describe('ProfessorModifyUsersComponent', () => {
  let component: ProfessorModifyUsersComponent;
  let fixture: ComponentFixture<ProfessorModifyUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorModifyUsersComponent]
    });
    fixture = TestBed.createComponent(ProfessorModifyUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
