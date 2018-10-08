import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterEmailComponent } from './register-email/register-email.component';
import { RegisterPassComponent } from './register-pass/register-pass.component';
import { TurnoNewComponent } from './paciente/turno-new/turno-new.component';
import { DatosPacienteComponent } from './paciente/datos-paciente/datos-paciente.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component'; 
import { AuthGuard } from './core/guards/auth.guard';
import { HomePacienteComponent } from './paciente/home-paciente/home-paciente.component';
import { AuthPacienteGuard } from './core/guards/auth-paciente.guard';
import { AuthPacienteChildrenGuard } from './core/guards/auth-paciente-children.guard';
import { HomeMedicoComponent } from './medico/home-medico/home-medico.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'paciente',
  canActivate: [AuthPacienteGuard],
  canActivateChild: [AuthPacienteChildrenGuard],
  children: [
    {path: 'turno-new', component: TurnoNewComponent},
    {path: 'datos-paciente', component: DatosPacienteComponent},
    {path: '**', redirectTo: ''},
  ],
   component: HomePacienteComponent,  },
   { path: 'medico',
   component: HomeMedicoComponent
   },
  { path: 'admin',
   component: HomeAdminComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-email/:enlace', component: RegisterEmailComponent },
  { path: 'register-pass', component: RegisterPassComponent},
  { path: 'reset-pass/:enlace', component: ResetPassComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
