import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';
import { Observable } from 'rxjs';
import { MedicoObraSocial } from '../models/medico-obra-social';

@Injectable({
  providedIn: 'root'
})
export class MedicoObraSocialService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public newMedicoObraSocial(medicoObraSociales: MedicoObraSocial[]): Observable<Boolean> {
    return this.http.post<Boolean>(this.config.pathServices + 'medico-obra-social/new-medico-obra-social',medicoObraSociales);
  }

  public get(nroLegajo: number): Observable<MedicoObraSocial[]> {
    return this.http.get<MedicoObraSocial[]>(this.config.pathServices + 'medico-obra-social/get/' + nroLegajo);
  }

  public setByMedico(nroLegajo: number, medicoObraSocial: MedicoObraSocial[]): Observable<Boolean> {
    return this.http.post<Boolean>(this.config.pathServices + 'medico-obra-social/set-by-medico/' + nroLegajo, medicoObraSocial);
  }
}
