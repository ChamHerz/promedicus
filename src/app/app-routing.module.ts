import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterEmailComponent } from './register-email/register-email.component';
import { RegisterPassComponent } from './register-pass/register-pass.component';
import { TurnoNewComponent } from './paciente/turno-new/turno-new.component';
import { TurnoPacienteComponent } from './paciente/turno-paciente/turno-paciente.component';
import { DatosPacienteComponent } from './paciente/datos-paciente/datos-paciente.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component'; 
import { AuthGuard } from './core/guards/auth.guard';
import { HomePacienteComponent } from './paciente/home-paciente/home-paciente.component';
import { AuthPacienteGuard } from './core/guards/auth-paciente.guard';
import { AuthPacienteChildrenGuard } from './core/guards/auth-paciente-children.guard';
import { MedicoGuard } from './core/guards/medico.guard';
import { HomeMedicoComponent } from './medico/home-medico/home-medico.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { HomeSecretariaComponent } from './secretaria/home-secretaria/home-secretaria.component';
import { AgendaComponent } from './medico/agenda/agenda.component';
import { ListarPacientesComponent } from './secretaria/listar-pacientes/listar-pacientes.component';
import { ListarUsuariosComponent } from './admin/listar-usuarios/listar-usuarios.component';
import { PacienteTurnoComponent } from './secretaria/paciente-turno/paciente-turno.component';
import { PacienteNewTurnoComponent } from './secretaria/paciente-new-turno/paciente-new-turno.component';
import { PacienteCrearComponent } from './secretaria/paciente-crear/paciente-crear.component';
import { ListarObraSocialesComponent } from './admin/listar-obra-sociales/listar-obra-sociales.component';
import { MedicosListarComponent } from './secretaria/medicos-listar/medicos-listar.component';
import { MedicoCrearComponent } from './admin/medico-crear/medico-crear.component';
import { MedicoModificarComponent } from './admin/medico-modificar/medico-modificar.component';
import { PacienteListarComponent } from './medico/paciente-listar/paciente-listar.component';
import { HistoriaClinicaComponent } from './medico/historia-clinica/historia-clinica.component';
import { MisTurnosComponent } from './medico/mis-turnos/mis-turnos.component';
import { MedicoMirarComponent } from './secretaria/medico-mirar/medico-mirar.component';
import { SecretariaModificarComponent } from './admin/secretaria-modificar/secretaria-modificar.component';
import { SecretariaGuard } from './core/guards/secretaria.guard';
import { SecretariaChildrenGuard } from './core/guards/secretaria-children.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'paciente',
  canActivate: [AuthPacienteGuard],
  canActivateChild: [AuthPacienteChildrenGuard],
  children: [
    {path: 'turno-new', component: TurnoNewComponent},
    {path: 'turno-paciente', component: TurnoPacienteComponent},
    {path: 'datos-paciente', component: DatosPacienteComponent},
    {path: '**', redirectTo: ''},
  ],
   component: HomePacienteComponent,  },
   { path: 'medico',
   canActivate: [MedicoGuard],
   component: HomeMedicoComponent,
   children: [
     {path: 'agenda', component: AgendaComponent},
     {path: 'mis-turnos', component: MisTurnosComponent},
     {path: 'paciente-listar', component: PacienteListarComponent},
     {path: 'paciente/historia/:dni', component: HistoriaClinicaComponent},
     {path: '**', redirectTo: ''}
   ]
   },
  { path: 'secretaria',
   canActivate: [SecretariaGuard],
   canActivateChild: [SecretariaChildrenGuard],
   component: HomeSecretariaComponent,
   children: [
     {path: 'listar-pacientes', component: ListarPacientesComponent},
     {path: 'paciente/:dni', component: PacienteTurnoComponent},
     {path: 'paciente-turno/:dni', component: PacienteNewTurnoComponent},
     {path: 'paciente-crear', component: PacienteCrearComponent},
     {path: 'medicos-listar', component: MedicosListarComponent},
     {path: 'medico-modificar/:nrolegajo', component: MedicoMirarComponent},
     {path: '**', redirectTo: ''}
   ]
  },
  { path: 'admin',
   component: HomeAdminComponent,
   canActivate: [AdminGuard],
   children: [
     {path: 'listar-usuarios', component: ListarUsuariosComponent},
     {path: 'listar-obra-sociales', component: ListarObraSocialesComponent},
     {path: 'paciente/:email', component: DatosPacienteComponent},
     {path: 'paciente', component: PacienteCrearComponent},
     {path: 'medico/:email', component: MedicoModificarComponent},
     {path: 'medico', component: MedicoCrearComponent},
     {path: 'secretaria/:email', component: SecretariaModificarComponent},
     {path: '**', redirectTo: ''}
   ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-email/:enlace', component: RegisterEmailComponent },
  { path: 'register-pass', component: RegisterPassComponent},
  { path: 'reset-pass/:enlace', component: ResetPassComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
