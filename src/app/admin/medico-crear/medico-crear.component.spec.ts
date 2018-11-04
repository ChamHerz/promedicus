
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoCrearComponent } from './medico-crear.component';

describe('MedicoCrearComponent', () => {
  let component: MedicoCrearComponent;
  let fixture: ComponentFixture<MedicoCrearComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
