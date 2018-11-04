import { Injectable } from '@angular/core';
import { EstadoBoolInterface } from '../interface/estado-bool.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadoBoolService {

  public estadosBool: EstadoBoolInterface[] = [
    {idEstado: false, estado: "Desactivado"},
    {idEstado: true, estado: "Activado"}
  ]

  public getEstadoBool(idEstadoBool: Boolean):String {
    let index = this.estadosBool.findIndex(
      x => idEstadoBool == x.idEstado
    );

    return (index == -1) ? null : this.estadosBool[index].estado;
  }

  constructor() { }
}
