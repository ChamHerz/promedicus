import { Especialidad } from './especialidad.model';

export class Medico {
    public nroLegajo: number;
    public dni: String;
    public nombre: String;
    public apellido: String;
    public direccion: String;
    public telefonco: String;
    public email: String;
    public fechaIngreso: Date;
    public especialidad: Especialidad;

    constructor() {
        this.nroLegajo = 0;
        this.nombre= "";
        this.apellido= "";
        this.direccion= "";
        this.telefonco= "";
        this.email= "";
        this.fechaIngreso= null;
        this.especialidad= null;
    }
}
