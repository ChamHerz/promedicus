import { TestBed } from '@angular/core/testing';

import { EstadoBoolService } from './estado-bool.service';

describe('EstadoBoolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadoBoolService = TestBed.get(EstadoBoolService);
    expect(service).toBeTruthy();
  });
});
