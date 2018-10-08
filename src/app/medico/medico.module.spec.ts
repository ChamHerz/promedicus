import { MedicoModule } from './medico.module';

describe('MedicoModule', () => {
  let medicoModule: MedicoModule;

  beforeEach(() => {
    medicoModule = new MedicoModule();
  });

  it('should create an instance', () => {
    expect(medicoModule).toBeTruthy();
  });
});
