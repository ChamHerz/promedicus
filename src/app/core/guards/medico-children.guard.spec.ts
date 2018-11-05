import { TestBed, async, inject } from '@angular/core/testing';

import { MedicoChildrenGuard } from './medico-children.guard';

describe('MedicoChildrenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicoChildrenGuard]
    });
  });

  it('should ...', inject([MedicoChildrenGuard], (guard: MedicoChildrenGuard) => {
    expect(guard).toBeTruthy();
  }));
});
