import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { UsuarioFilter } from '../interface/usuario-filter';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private storageService: StorageService
  ) { }

  public gerCurrentUser(): User {
    return this.storageService.getCurrentUser()
  }

  public newUsuario(usuario: User): Observable<User> {
    return this.http.post<User>(this.config.pathServices + 'usuario/new',usuario);
  }

  public updateUsuario(usuario: User): Observable<User> {
    return this.http.put<User>(this.config.pathServices + 'usuario/update-from-paciente',usuario);
  }

  public get(email: String): Observable<User> {
    return this.http.get<User>(this.config.pathServices + 'usuario/get/' + email);
  }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.config.pathServices + 'usuario/get-all');
  }

  public getAllWithFilter(usuarioFilter: UsuarioFilter): Observable<User[]> {
    return this.http.post<User[]>(this.config.pathServices + 'usuario/get-all-with-filter',usuarioFilter);
  }

  public desactivar(idUsuario: String): Observable<Boolean> {
    return this.http.put<Boolean>(this.config.pathServices + 'usuario/desactivar/' + idUsuario, null);
  }

  public activar(idUsuario: String): Observable<Boolean> {
    return this.http.put<Boolean>(this.config.pathServices + 'usuario/activar/' + idUsuario, null);
  }

}