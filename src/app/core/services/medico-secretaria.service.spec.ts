import { TestBed } from '@angular/core/testing';

import { MedicoSecretariaService } from './medico-secretaria.service';

describe('MedicoSecretariaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicoSecretariaService = TestBed.get(MedicoSecretariaService);
    expect(service).toBeTruthy();
  });
});
