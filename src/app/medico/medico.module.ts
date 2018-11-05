import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeMedicoComponent } from './home-medico/home-medico.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  MatToolbarModule, 
  MatButtonModule, 
  MatSidenavModule, 
  MatIconModule,
  MatListModule, 
  MatGridListModule, 
  MatCardModule,
  MatInputModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatTableModule,
  MatMenuModule } from '@angular/material';
import { AgendaComponent } from './agenda/agenda.component';
import {SelectionModel} from '@angular/cdk/collections';
import { PacienteListarComponent } from './paciente-listar/paciente-listar.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  declarations: [HomeMedicoComponent, AgendaComponent, PacienteListarComponent, HistoriaClinicaComponent, MisTurnosComponent],
  exports: [
    HomeMedicoComponent
  ]
})
export class MedicoModule { }
