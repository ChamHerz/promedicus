
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarObraSocialesComponent } from './listar-obra-sociales.component';

describe('ListarObraSocialesComponent', () => {
  let component: ListarObraSocialesComponent;
  let fixture: ComponentFixture<ListarObraSocialesComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarObraSocialesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarObraSocialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
