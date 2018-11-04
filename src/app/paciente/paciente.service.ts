import { Injectable } from '@angular/core';
import { User } from '../core/models/user.model';
import { StorageService } from '../core/services/storage.service';
import { AuthenticationService } from '../login/shared/authentication.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../core/shared/config.service';
import { Token } from '../core/models/token.model';
import { Paciente } from '../core/models/paciente.model';
import { PacienteFilter } from '../core/interface/paciente-filter';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private user: User;

  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public updatePaciente(paciente: Paciente): Observable<Boolean> {
    return this.http.put<Boolean>(this.config.pathServices + 'paciente/update-from-paciente', paciente);
  }

  public getCurrentUser(): Observable<User> {
    let token: Token = {token: this.getCurrentToken()};
    return this.http.post<User>(this.config.pathServices + 'usuario/get-one', token);
  }

  public new(paciente: Paciente): Observable<Boolean> {
    return this.http.post<Boolean>(this.config.pathServices + 'paciente/new', paciente);
  }

  public getCurrentToken(): String {
    return this.storageService.getCurrentToken();
  }

  public logout(): void{
    this.authenticationService.logout().subscribe(
        response => {if(response) {this.storageService.logout();}}
    );
  }

  public get(email: String): Observable<Paciente> {
    return this.http.get<Paciente>(this.config.pathServices + 'paciente/get-by-email/' + email);
  }

  public getByDni(dni: String): Observable<Paciente> {
    return this.http.get<Paciente>(this.config.pathServices + 'paciente/get-by-dni/' + dni);
  }

  public getAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.config.pathServices + 'paciente/get-all');
  }

  public getAllWithFilter(pacienteFilter: PacienteFilter): Observable<Paciente[]> {
    return this.http.post<Paciente[]>(this.config.pathServices + 'paciente/get-all-with-filter',pacienteFilter);
  }

}
