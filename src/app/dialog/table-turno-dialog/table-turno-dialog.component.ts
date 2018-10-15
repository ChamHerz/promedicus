import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TurnoInterface } from '../../core/interface/turno-interface';

export interface Turno {
  fecha: string;
  position: number;
  hora: string;
  duracion: number;
}

export interface DataConsume {
  title: string;
  body: string;
  turnos: TurnoInterface[];
}

const ELEMENT_DATA: Turno[] = [
  {position: 1, fecha: 'Hydrogen', hora: "1.0079", duracion: 30},
  {position: 2, fecha: 'Helium', hora: "4.0026", duracion: 30}
];

@Component({
  selector: 'app-table-turno-dialog',
  templateUrl: './table-turno-dialog.component.html',
  styleUrls: ['./table-turno-dialog.component.css']
})
export class TableTurnoDialogComponent implements OnInit {
  turnos: TurnoInterface[];
  displayedColumns = ['position', 'fecha', 'hora', 'duracion'];
  dataSource = new Array<Turno>();

  constructor(
    public dialogRef: MatDialogRef<TableTurnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataConsume
  ) { }

  ngOnInit() {
    this.turnos =this.data.turnos;
    this.turnos.forEach((unElemento,index) => {
      this.dataSource.push({
        position: index,
        fecha: unElemento.fechaComienzo.toLocaleDateString(),
        hora: unElemento.fechaComienzo.toLocaleTimeString(),
        duracion: unElemento.duracionTurno
      })
    });
  }

  close() {
    this.dialogRef.close(true);
  }

  cancelar(){
    this.dialogRef.close(false);
  }

}
