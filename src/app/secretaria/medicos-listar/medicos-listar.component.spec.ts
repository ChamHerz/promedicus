
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosListarComponent } from './medicos-listar.component';

describe('MedicosListarComponent', () => {
  let component: MedicosListarComponent;
  let fixture: ComponentFixture<MedicosListarComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicosListarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
