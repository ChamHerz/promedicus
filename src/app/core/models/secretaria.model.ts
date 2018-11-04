export class Secretaria {
    public nroLegajo: number;
    public dni: string;
    public nombre: string;
    public apellido: string;
    public direccion: string;
    public telefono: string;
    public email: string;
    public fechaIngreso: Date;

    constructor() {
        this.nroLegajo = 0;
        this.nombre= "";
        this.apellido= "";
        this.direccion= "";
        this.telefono= "";
        this.email= "";
        this.fechaIngreso= null;
    }
}
