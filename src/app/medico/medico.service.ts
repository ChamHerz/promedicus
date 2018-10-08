import { Injectable } from '@angular/core';
import { StorageService } from '../core/services/storage.service';
import { AuthenticationService } from '../login/shared/authentication.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../core/shared/config.service';
import { Observable } from 'rxjs';
import { Medico } from '../core/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public getAllNames(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.config.pathServices + 'medico/get-all-names');
  }

  public getCurrentToken(): String {
    return this.storageService.getCurrentToken();
  }

  public getMedico(email: String): Observable<Medico> {
    return this.http.get<Medico>(this.config.pathServices + 'medico/by-email/' + email);
  }

  public logout(): void{
    this.authenticationService.logout().subscribe(
        response => {if(response) {this.storageService.logout();}}
    );
  }

}
