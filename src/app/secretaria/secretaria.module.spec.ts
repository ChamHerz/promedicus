import { SecretariaModule } from './secretaria.module';

describe('SecretariaModule', () => {
  let secretariaModule: SecretariaModule;

  beforeEach(() => {
    secretariaModule = new SecretariaModule();
  });

  it('should create an instance', () => {
    expect(secretariaModule).toBeTruthy();
  });
});
