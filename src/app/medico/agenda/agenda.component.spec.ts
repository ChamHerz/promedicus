
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaComponent } from './agenda.component';

describe('AgendaComponent', () => {
  let component: AgendaComponent;
  let fixture: ComponentFixture<AgendaComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
