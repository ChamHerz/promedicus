
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoModificarComponent } from './medico-modificar.component';

describe('MedicoModificarComponent', () => {
  let component: MedicoModificarComponent;
  let fixture: ComponentFixture<MedicoModificarComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoModificarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
