import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './home-admin/home-admin.component';
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
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { ListarObraSocialesComponent } from './listar-obra-sociales/listar-obra-sociales.component';
import { MedicoCrearComponent } from './medico-crear/medico-crear.component';
import { MedicoModificarComponent } from './medico-modificar/medico-modificar.component';
import { SecretariaModificarComponent } from './secretaria-modificar/secretaria-modificar.component';

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
  declarations: [HomeAdminComponent, ListarUsuariosComponent, ListarObraSocialesComponent, MedicoCrearComponent, MedicoModificarComponent, SecretariaModificarComponent],
  exports: [HomeAdminComponent]
})
export class AdminModule { }
