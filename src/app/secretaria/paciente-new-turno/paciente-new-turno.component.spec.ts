
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteNewTurnoComponent } from './paciente-new-turno.component';

describe('PacienteNewTurnoComponent', () => {
  let component: PacienteNewTurnoComponent;
  let fixture: ComponentFixture<PacienteNewTurnoComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteNewTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteNewTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
