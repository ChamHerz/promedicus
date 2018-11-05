import { TestBed } from '@angular/core/testing';

import { HistoriaClinicaService } from './historia-clinica.service';

describe('HistoriaClinicaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoriaClinicaService = TestBed.get(HistoriaClinicaService);
    expect(service).toBeTruthy();
  });
});
