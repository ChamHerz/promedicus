import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../models/session.model';
import { User } from '../models/user.model';
import { NivelUsuario } from '../models/nivel-usuario.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageService;
  private currenSession: Session = null;

  constructor(private route: Router) {
    this.localStorageService = localStorage;
    this.currenSession = this.loadSessionData();
  }

  //carga la session guardada
  loadSessionData(): Session {
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  //guarda la session
  setCurrentSession(session: Session):void {
    this.currenSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  getCurrentSession(): Session {
    return this.currenSession;
  }

  removeCurrenteSession(): void {
    this.currenSession = null;
    this.localStorageService.removeItem('currentUser');
  }

  //devuelve el usuario dentro del Session
  getCurrentUser(): User {
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  }

  getNivelUsuario(): NivelUsuario {
    var session: Session = this.getCurrentSession();
    return (session) ? session.nivelPermiso : null;
  }

  getCurrentToken(): string {
    var session: Session = this.getCurrentSession();
    return (session && session.token) ? session.token: null;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true: false;
  }

  isPaciente(): boolean {
    return (this.getNivelUsuario() == NivelUsuario.Paciente) ? true : false;
  }

  isSecretaria(): boolean {
    return (this.getNivelUsuario() == NivelUsuario.Secretaria) ? true : false;
  }

  isMedico(): boolean {
    return (this.getNivelUsuario() == NivelUsuario.Medico) ? true : false;
  }

  isAdministrador(): boolean {
    return (this.getNivelUsuario() == NivelUsuario.Administrador) ? true : false;
  }

  logout(): void {
    this.removeCurrenteSession();
    this.route.navigate(['/login']);
  }
}
