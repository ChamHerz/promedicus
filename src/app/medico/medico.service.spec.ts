import { TestBed } from '@angular/core/testing';

import { MedicoService } from './medico.service';

describe('MedicoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicoService = TestBed.get(MedicoService);
    expect(service).toBeTruthy();
  });
});
