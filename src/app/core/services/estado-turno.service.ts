import { Injectable } from '@angular/core';
import { EstadoTurnoInterface } from '../interface/estado-turno-interface';
import { EstadoTurno } from '../models/estado-turno.enum';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EstadoTurnoService {

  public listaEstadoTurnos: EstadoTurnoInterface[] = [
    {idEstado: EstadoTurno.Cancelado, estadoTurno: "Cancelado" },
    {idEstado: EstadoTurno.Activo, estadoTurno: "Activo" },
    {idEstado: EstadoTurno.Cumplido, estadoTurno: "Cumplido" },
    {idEstado: EstadoTurno.Ausente, estadoTurno: "Ausente" },
    {idEstado: EstadoTurno.Ocupado, estadoTurno: "Confirmado" },
    {idEstado: EstadoTurno.Disponible, estadoTurno: "Disponible" }
  ]

  public getEstado(idEstado: EstadoTurno):String {
    let index = this.listaEstadoTurnos.findIndex(
      x => idEstado == x.idEstado
    );

    return (index == -1) ? null : this.listaEstadoTurnos[index].estadoTurno;
  }

  constructor() { }
}
