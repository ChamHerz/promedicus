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

  // public newMedicoObraSocial(medicoObraSociales: MedicoObraSocial[]): Observable<Boolean> {
  //   return this.http.post<Boolean>(this.config.pathServices + 'medico-obra-social/new-medico-obra-social',medicoObraSociales);
  // }

  public getByMedico(nroLegajo: number): Observable<MedicoSecretaria[]> {
    return this.http.get<MedicoSecretaria[]>(this.config.pathServices + 'medico-secretaria/get-by-medico/' + nroLegajo);
  }

  // public setByMedico(medicoSecretaria: MedicoSecretaria[]): Observable<Boolean> {
  //   return this.http.post<Boolean>(this.config.pathServices + 'medico-secretaria/set-by-medico', medicoSecretaria);
  // }

  public setByMedico(
    nroLegajoMedico: number,
    medicoSecretaria: MedicoSecretaria[]): Observable<Boolean> {
    return this.http.post<Boolean>(this.config.pathServices + 'medico-secretaria/set-by-medico/' + nroLegajoMedico, medicoSecretaria);
  }
}