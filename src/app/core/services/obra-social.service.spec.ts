import { TestBed } from '@angular/core/testing';

import { ObraSocialService } from './obra-social.service';

describe('ObraSocialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObraSocialService = TestBed.get(ObraSocialService);
    expect(service).toBeTruthy();
  });
});
