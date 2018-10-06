
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomePacienteComponent } from './home-paciente.component';

describe('HomePacienteComponent', () => {
  let component: HomePacienteComponent;
  let fixture: ComponentFixture<HomePacienteComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [HomePacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
