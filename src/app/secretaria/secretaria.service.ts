import { Injectable } from '@angular/core';
import { StorageService } from '../core/services/storage.service';
import { AuthenticationService } from '../login/shared/authentication.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../core/shared/config.service';
import { Observable } from 'rxjs';
import { Secretaria } from '../core/models/secretaria.model';

@Injectable({
  providedIn: 'root'
})
export class SecretariaService {

  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public getCurrentToken(): String {
    return this.storageService.getCurrentToken();
  }

  public getSecretaria(email: String): Observable<Secretaria> {
    return this.http.get<Secretaria>(this.config.pathServices + 'secretaria/by-email/' + email);
  }

  public getAllNames(): Observable<Secretaria[]> {
    return this.http.get<Secretaria[]>(this.config.pathServices + 'secretaria/get-all-names');
  }

  public logout(): void{
    this.authenticationService.logout().subscribe(
        response => {if(response) {this.storageService.logout();}}
    );
  }
}
