import { NivelUsuario } from "./nivel-usuario.enum";

export class User {
    public email: string;
    public nivelPermiso: NivelUsuario;
    public activo: Boolean;
    public emailConfirm: Boolean;
    public pathReset: String;
    public nombre: String;
    public apellido: String;
    public password?: string;

    constructor(object: any) {
        this.email = (object.emailGroup.email) ? object.emailGroup.email: null;
        this.password = (object.passwordGroup.password) ? object.passwordGroup.password: null;
        this.nivelPermiso = NivelUsuario.Paciente;
        this.activo = true;
        this.emailConfirm = true;
        this.pathReset = "nada";
        this.nombre = "";
        this.apellido= "";
    }
}