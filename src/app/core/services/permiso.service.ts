import { Injectable } from '@angular/core';
import { Permiso } from '../interface/permiso';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  public listaPermisos: Permiso[] = [
    {idPermiso: 0, nombrePermiso: "Paciente" },
    {idPermiso: 1, nombrePermiso: "Secretaria" },
    {idPermiso: 2, nombrePermiso: "Medico" },
    {idPermiso: 3, nombrePermiso: "Administrador" }
  ]

  public getPermiso(idPermiso: number):String {
    let index = this.listaPermisos.findIndex(
      x => idPermiso == x.idPermiso
    );

    return (index == -1) ? null : this.listaPermisos[index].nombrePermiso;
  }

  constructor() { }
}