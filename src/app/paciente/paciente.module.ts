import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePacienteComponent } from './home-paciente/home-paciente.component';
import { LayoutModule } from '@angular/cdk/layout';
import { 
  MatInputModule,
  MatToolbarModule, 
  MatButtonModule, 
  MatSidenavModule, 
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatCardModule, 
  MatListModule,
  MatCheckboxModule,
  MatTableModule,
  MatGridListModule,
  MatMenuModule } from '@angular/material';
import { TurnoNewComponent } from './turno-new/turno-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosPacienteComponent } from './datos-paciente/datos-paciente.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCheckboxModule,
    MatTableModule,
    MatMenuModule
  ],
  declarations: [
    HomePacienteComponent, 
    TurnoNewComponent, 
    DatosPacienteComponent],
  exports: [
    HomePacienteComponent,
    TurnoNewComponent,
    DatosPacienteComponent
  ]
})
export class PacienteModule { }
