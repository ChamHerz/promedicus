import { TestBed } from '@angular/core/testing';

import { MedicoObraSocialService } from './medico-obra-social.service';

describe('MedicoObraSocialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicoObraSocialService = TestBed.get(MedicoObraSocialService);
    expect(service).toBeTruthy();
  });
});
