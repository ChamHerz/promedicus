
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoNewComponent } from './turno-new.component';

describe('TurnoNewComponent', () => {
  let component: TurnoNewComponent;
  let fixture: ComponentFixture<TurnoNewComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
