import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PacienteModule } from './paciente/paciente.module';
import { MedicoModule } from './medico/medico.module';
import { AdminModule } from './admin/admin.module';
import { RegisterComponent } from './register/register.component';
import { DialogModule } from './dialog/dialog.module';
import { RegisterEmailComponent } from './register-email/register-email.component';
import { RegisterPassComponent } from './register-pass/register-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    RegisterEmailComponent,
    RegisterPassComponent,
    ResetPassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    PacienteModule,
    MatDialogModule,
    DialogModule,
    MedicoModule,
    AdminModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
