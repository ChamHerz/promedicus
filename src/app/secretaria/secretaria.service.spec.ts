import { TestBed } from '@angular/core/testing';

import { SecretariaService } from './secretaria.service';

describe('SecretariaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecretariaService = TestBed.get(SecretariaService);
    expect(service).toBeTruthy();
  });
});
