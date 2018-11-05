
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariaModificarComponent } from './secretaria-modificar.component';

describe('SecretariaModificarComponent', () => {
  let component: SecretariaModificarComponent;
  let fixture: ComponentFixture<SecretariaModificarComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretariaModificarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretariaModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
