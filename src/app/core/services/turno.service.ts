import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno.model';
import { TurnoConsulta } from '../interface/turno-consulta';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public addturnos(listaTurnos: Turno[]): Observable<Boolean> {
    return this.http.post<Boolean>(this.config.pathServices + 'turno/add-turnos',listaTurnos);
  }

  public getTurnos(turnoConsulta: TurnoConsulta): Observable<Turno[]> {
    return this.http.post<Turno[]>(this.config.pathServices + 'turno/get-turnos', turnoConsulta);
  }
}
