import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTurnoDialogComponent } from './table-turno-dialog.component';

describe('TableTurnoDialogComponent', () => {
  let component: TableTurnoDialogComponent;
  let fixture: ComponentFixture<TableTurnoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTurnoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTurnoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
