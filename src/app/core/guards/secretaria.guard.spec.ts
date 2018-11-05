import { TestBed, async, inject } from '@angular/core/testing';

import { SecretariaGuard } from './secretaria.guard';

describe('SecretariaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecretariaGuard]
    });
  });

  it('should ...', inject([SecretariaGuard], (guard: SecretariaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
