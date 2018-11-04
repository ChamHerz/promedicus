import { TestBed } from '@angular/core/testing';

import { EstadoTurnoService } from './estado-turno.service';

describe('EstadoTurnoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadoTurnoService = TestBed.get(EstadoTurnoService);
    expect(service).toBeTruthy();
  });
});
