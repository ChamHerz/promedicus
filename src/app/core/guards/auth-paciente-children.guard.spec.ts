import { TestBed, async, inject } from '@angular/core/testing';

import { AuthPacienteChildrenGuard } from './auth-paciente-children.guard';

describe('AuthPacienteChildrenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthPacienteChildrenGuard]
    });
  });

  it('should ...', inject([AuthPacienteChildrenGuard], (guard: AuthPacienteChildrenGuard) => {
    expect(guard).toBeTruthy();
  }));
});
