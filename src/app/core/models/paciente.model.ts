export class Paciente {
    public dni: string;
    public nombre: string;
    public apellido: string;
    public direccion: string;
    public telefono: string;
    public email: string;
    public idObraSocial?: number;
    public estadoCivil?: number;
    public sexo?: string;

    constructor() {
        this.dni = "";
        this.nombre = "";
        this.apellido = "";
        this.direccion = "";
        this.telefono = "";
        this.email = "";
        this.idObraSocial = -1;
        this.estadoCivil = -1;
    }
}