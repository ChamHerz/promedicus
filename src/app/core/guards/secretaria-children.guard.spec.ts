import { TestBed, async, inject } from '@angular/core/testing';

import { SecretariaChildrenGuard } from './secretaria-children.guard';

describe('SecretariaChildrenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecretariaChildrenGuard]
    });
  });

  it('should ...', inject([SecretariaChildrenGuard], (guard: SecretariaChildrenGuard) => {
    expect(guard).toBeTruthy();
  }));
});
