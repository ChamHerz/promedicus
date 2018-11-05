
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTurnosComponent } from './mis-turnos.component';

describe('MisTurnosComponent', () => {
  let component: MisTurnosComponent;
  let fixture: ComponentFixture<MisTurnosComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MisTurnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
