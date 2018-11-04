import { Injectable } from '@angular/core';
import { StorageService } from '../core/services/storage.service';
import { AuthenticationService } from '../login/shared/authentication.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../core/shared/config.service';
import { Observable } from 'rxjs';
import { Medico } from '../core/models/medico.model';
import { MedicoFilter } from '../core/interface/medico-filter';

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

  public updateFromAdmin(medico: Medico): Observable<Boolean> {
    return this.http.put<Boolean>(this.config.pathServices + 'medico/update-from-admin',medico);
  }

  public newMedico(medico: Medico): Observable<Boolean> {
    return this.http.post<Boolean>(this.config.pathServices + 'medico/new-medico',medico);
  }

  public logout(): void{
    this.authenticationService.logout().subscribe(
        response => {if(response) {this.storageService.logout();}}
    );
  }

  public getAllWithFilter(medicoFilter: MedicoFilter): Observable<Medico[]> {
    return this.http.post<Medico[]>(this.config.pathServices + 'medico/get-all-with-filter',medicoFilter);
  }

  public getAllWithFilterOnlySecretary(nroLegajo: number, medicoFilter: MedicoFilter): Observable<Medico[]> {
    return this.http.post<Medico[]>(this.config.pathServices + 'medico/get-all-with-filter-only-secretary/' + nroLegajo,medicoFilter);
  }
}
