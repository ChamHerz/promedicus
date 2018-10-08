
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPacienteComponent } from './datos-paciente.component';

describe('DatosPacienteComponent', () => {
  let component: DatosPacienteComponent;
  let fixture: ComponentFixture<DatosPacienteComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
