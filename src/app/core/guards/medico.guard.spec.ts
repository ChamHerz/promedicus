import { TestBed, async, inject } from '@angular/core/testing';

import { MedicoGuard } from './medico.guard';

describe('MedicoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicoGuard]
    });
  });

  it('should ...', inject([MedicoGuard], (guard: MedicoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
