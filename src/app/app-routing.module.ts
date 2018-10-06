import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterEmailComponent } from './register-email/register-email.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomePacienteComponent } from './paciente/home-paciente/home-paciente.component';
import { AuthPacienteGuard } from './core/guards/auth-paciente.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'paciente', component: HomePacienteComponent, canActivate: [AuthPacienteGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-email/:enlace', component: RegisterEmailComponent },
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
