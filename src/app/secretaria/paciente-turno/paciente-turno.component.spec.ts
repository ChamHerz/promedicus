
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteTurnoComponent } from './paciente-turno.component';

describe('PacienteTurnoComponent', () => {
  let component: PacienteTurnoComponent;
  let fixture: ComponentFixture<PacienteTurnoComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
