import { EstadoTurno } from './estado-turno.enum';
import { Especialidad } from './especialidad.model';
import { Medico } from './medico.model';

export class Turno {
    public nroLegajo: number;
    public duracion: number;
    public fechaHora: Date;
    public estadoTurno: EstadoTurno;
    public idEspecialidad: number;
    public medico?: Medico;
    public especialidad?: Especialidad;
    public idAgendasTurnos?: number;
    public dniPaciente?: string;
    public idTurno?: number;
}