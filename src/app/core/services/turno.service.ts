import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno.model';
import { TurnoConsulta } from '../interface/turno-consulta';
import { EstadoTurno } from '../models/estado-turno.enum';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public getTurnosDePaciente(unDni: number,unEstado: EstadoTurno): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.config.pathServices + 'turno/get-turnos-de-paciente/'+ unDni +'/'+ unEstado);
  }

  public getTurnosDeMedico(nroLegajo: number,unEstado: EstadoTurno): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.config.pathServices + 'turno/get-turnos-de-medico/'+ nroLegajo +'/'+ unEstado);
  }

  public solicitarTurno(idTurno: number, idPaciente: number): Observable<Boolean> {
    return this.http.put<Boolean>(this.config.pathServices + 'turno/solicitar/'+ idTurno + '/' + idPaciente,null);
  }

  public confirmarTurno(idTurno: number): Observable<Boolean> {
    return this.http.put<Boolean>(this.config.pathServices + 'turno/confirmar/'+ idTurno,null);
  }

  public cancelarTurno(idTurno: number, idPaciente: number): Observable<Boolean> {
    return this.http.put<Boolean>(this.config.pathServices + 'turno/cancelar/'+ idTurno + '/' + idPaciente,null);
  }

  public addturnos(listaTurnos: Turno[]): Observable<Boolean> {
    return this.http.post<Boolean>(this.config.pathServices + 'turno/add-turnos',listaTurnos);
  }

  public getTurnos(turnoConsulta: TurnoConsulta): Observable<Turno[]> {
    return this.http.post<Turno[]>(this.config.pathServices + 'turno/get-turnos', turnoConsulta);
  }
}
