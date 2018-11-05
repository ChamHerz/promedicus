import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSecretariaComponent } from './home-secretaria/home-secretaria.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { PacienteTurnoComponent } from './paciente-turno/paciente-turno.component';
import { PacienteNewTurnoComponent } from './paciente-new-turno/paciente-new-turno.component';
import { PacienteCrearComponent } from './paciente-crear/paciente-crear.component';
import { MedicosListarComponent } from './medicos-listar/medicos-listar.component';
import { MedicoMirarComponent } from './medico-mirar/medico-mirar.component';

@NgModule({
  imports: [
    MatInputModule,
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatGridListModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HomeSecretariaComponent, ListarPacientesComponent, PacienteTurnoComponent, PacienteNewTurnoComponent, PacienteCrearComponent, MedicosListarComponent, MedicoMirarComponent],
  exports: [HomeSecretariaComponent, ListarPacientesComponent, PacienteTurnoComponent]
})
export class SecretariaModule { }
