import { TestBed } from '@angular/core/testing';

import { EspecilidadService } from './especilidad.service';

describe('EspecilidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EspecilidadService = TestBed.get(EspecilidadService);
    expect(service).toBeTruthy();
  });
});
