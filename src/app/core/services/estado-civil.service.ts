import { Injectable } from '@angular/core';
import { EstadoCivil } from '../interface/estado-civil';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {

  public listaEstadoCivil: EstadoCivil[] = [
    {idEstadoCivil: 0, estadoCivil: "Soltero"},
    {idEstadoCivil: 1, estadoCivil: "Casado"},
    {idEstadoCivil: 2, estadoCivil: "Viudo"},
    {idEstadoCivil: 3, estadoCivil: "Separado"}
  ]

  public getEstadoCivil(idEstadoCivil: number):String {
    let index = this.listaEstadoCivil.findIndex(
      x => idEstadoCivil == x.idEstadoCivil
    );

    return (index == -1) ? null : this.listaEstadoCivil[index].estadoCivil;
  }

  constructor() { }
}
