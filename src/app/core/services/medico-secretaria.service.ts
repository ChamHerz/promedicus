import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';
import { Observable } from 'rxjs';
import { MedicoSecretaria } from '../models/medico-secretaria';

@Injectable({
  providedIn: 'root'
})
export class MedicoSecretariaService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public getBySecretary(nroLegajo: number): Observable<MedicoSecretaria[]> {
    return this.http.get<MedicoSecretaria[]>(this.config.pathServices + 'medico-secretaria/get-by-secretary/' + nroLegajo);
  }

  public setBySecretary(
    nroLegajoSecretaria: number,
    medicoSecretaria: MedicoSecretaria[]): Observable<Boolean> {
    return this.http.post<Boolean>(this.config.pathServices + 'medico-secretaria/set-by-secretary/' + nroLegajoSecretaria, medicoSecretaria);
  }

  public getByMedico(nroLegajo: number): Observable<MedicoSecretaria[]> {
    return this.http.get<MedicoSecretaria[]>(this.config.pathServices + 'medico-secretaria/get-by-medico/' + nroLegajo);
  }

  public setByMedico(
    nroLegajoMedico: number,
    medicoSecretaria: MedicoSecretaria[]): Observable<Boolean> {
    return this.http.post<Boolean>(this.config.pathServices + 'medico-secretaria/set-by-medico/' + nroLegajoMedico, medicoSecretaria);
  }
}