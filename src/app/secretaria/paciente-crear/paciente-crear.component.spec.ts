
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteCrearComponent } from './paciente-crear.component';

describe('PacienteCrearComponent', () => {
  let component: PacienteCrearComponent;
  let fixture: ComponentFixture<PacienteCrearComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
