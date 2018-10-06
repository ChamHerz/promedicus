import { User } from "./user.model";
import { NivelUsuario } from "./nivel-usuario.enum";

export class Session {
    public token: string;
    public nivelPermiso: NivelUsuario;
    public user: User;
}