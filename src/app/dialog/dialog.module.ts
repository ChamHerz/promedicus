import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { 
  MatDialogModule,
  MatButtonModule
 } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [SimpleDialogComponent],
  entryComponents: [SimpleDialogComponent],
  exports: [
    SimpleDialogComponent
  ]
})
export class DialogModule { }
