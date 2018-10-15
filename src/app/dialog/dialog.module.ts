import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { 
  MatDialogModule,
  MatButtonModule,
  MatTableModule
 } from '@angular/material';
import { TableTurnoDialogComponent } from './table-turno-dialog/table-turno-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule
  ],
  declarations: [SimpleDialogComponent, TableTurnoDialogComponent],
  entryComponents: [SimpleDialogComponent, TableTurnoDialogComponent],
  exports: [
    SimpleDialogComponent,
    TableTurnoDialogComponent
  ]
})
export class DialogModule { }
