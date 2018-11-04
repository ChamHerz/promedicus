import { Especialidad } from './especialidad.model';

export class Medico {
    public nroLegajo: number;
    public dni: String;
    public nombre: String;
    public apellido: String;
    public direccion: String;
    public telefono: String;
    public email: String;
    public fechaIngreso: Date;
    public especialidad: Number;

    constructor() {
        this.nroLegajo = 0;
        this.nombre= "";
        this.apellido= "";
        this.direccion= "";
        this.telefono= "";
        this.email= "";
        this.fechaIngreso= null;
        this.especialidad= null;
    }
}
