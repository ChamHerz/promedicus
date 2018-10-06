import { PacienteModule } from './paciente.module';

describe('PacienteModule', () => {
  let pacienteModule: PacienteModule;

  beforeEach(() => {
    pacienteModule = new PacienteModule();
  });

  it('should create an instance', () => {
    expect(pacienteModule).toBeTruthy();
  });
});
