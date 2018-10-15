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
    public especialidad: Especialidad;

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

    setFromAny(object: any): void {
        this.nroLegajo = (object.nroLegajo) ? object.nroLegajo: null;
        this.nombre= (object.nombre) ? object.nombre: null;
        this.apellido= (object.apellido) ? object.apellido: null;
        this.direccion= (object.direccion) ? object.direccion: null;
        this.telefono= (object.telefono) ? object.telefono: null;
        this.email= (object.email) ? object.email: null;
        this.fechaIngreso= (object.fechaIngreso) ? object.fechaIngreso: null;
        this.especialidad= (object.especialidad) ? object.especialidad: null;
    }

}
