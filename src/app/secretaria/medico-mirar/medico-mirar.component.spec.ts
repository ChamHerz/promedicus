
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoMirarComponent } from './medico-mirar.component';

describe('MedicoMirarComponent', () => {
  let component: MedicoMirarComponent;
  let fixture: ComponentFixture<MedicoMirarComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoMirarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoMirarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
