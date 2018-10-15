import { Component, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from '../../core/models/especialidad.model';
import { EspecilidadService } from '../../core/services/especilidad.service';
import { Medico } from '../../core/models/medico.model';
import { MedicoService } from '../../medico/medico.service';

//tabla
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { TurnoService } from '../../core/services/turno.service'
import { TurnoConsulta } from '../../core/interface/turno-consulta';

//tipo calendario
import {DateAdapter} from '@angular/material/core';

export interface FuturosTurnos {
  position: number;
  fecha: string;
  hora: string;
  rango: number;
  especialidad: string;
  medico: string;
}

// const rangoHorario: FuturosTurnos[] = [
//   {position: 1, fecha: '8:00', hora: "9:00", especialidad: "NUTRICION", medico: "Flache", rango: 8},
//   {position: 2, fecha: '9:00', hora: "10:00", especialidad: "NUTRICION", medico: "Flache", rango: 9},
//   {position: 3, fecha: '10:00', hora: "11:00", especialidad: "NUTRICION", medico: "Flache", rango: 10}
// ];

@Component({
  selector: 'app-paciente/turno-new',
  templateUrl: './turno-new.component.html',
  styleUrls: ['./turno-new.component.css']
})
export class TurnoNewComponent {
  minDate: Date = new Date();
  maxDate: Date = new Date();

  grid= {
    desde: {col: 1, row: 1},
    hasta: {col: 1, row: 1},
    especialidad: {col: 1, row: 1},
    medico: {col: 2, row: 1},
    botonConfirmar: {col: 1, row: 1},
    tablaTurnos: {col: 6, row: 4}
  }

  public formNewTurno: FormGroup;
  public especialidades: Especialidad[];
  public medicos: Medico[];

  //table
  futurosTurnos = new Array<FuturosTurnos>();
  displayedColumns: string[] = ['position', 'Fecha', 'Hora', 'Especialidad', 'Medico','select'];
  dataSource = new MatTableDataSource<FuturosTurnos>(this.futurosTurnos);
  selection = new SelectionModel<FuturosTurnos>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  oneSelect(fila){
    this.selection.clear();
    this.selection.toggle(fila);
    console.log(fila);
  }

  layoutChanges = this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
    if(result.matches){
      //celular
      this.grid = {
        desde: {col: 6, row: 1},
        hasta: {col: 6, row: 1},
        especialidad: {col: 6, row: 1},
        medico: {col: 6, row: 1},
        botonConfirmar: {col: 6, row: 1},
        tablaTurnos: {col: 6, row: 4}
      }
      return;
    }
    //escritorio
    this.grid = {
      desde: {col: 1, row: 1},
      hasta: {col: 1, row: 1},
      especialidad: {col: 1, row: 1},
      medico: {col: 2, row: 1},
      botonConfirmar: {col: 1, row: 1},
      tablaTurnos: {col: 6, row: 4}
    }
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private adapter: DateAdapter<any>,
    private especialidadService: EspecilidadService,
    private medicoService: MedicoService,
    private turnoService: TurnoService
    ) {}

  ngOnInit() {
    this.adapter.setLocale('mx');

    this.especialidadService.getEspecialidades().subscribe(
      data => this.correctEspecialidades(data)
    )

    this.medicoService.getAllNames().subscribe(
      data => this.correctMedicos(data)
    )

    this.maxDate.setDate(this.minDate.getDate() + 1);

    this.formNewTurno = this.formBuilder.group({
      desde: ['',[ Validators.required]],
      hasta: ['',[ Validators.required]],
      especialidadControl: ['',[ Validators.required]],
      medicoControl: ['',[]]
    });
  }

  correctMedicos(data: Medico[]) {
    this.medicos = data;
  }

  correctEspecialidades(data: Especialidad[]) {
    this.especialidades = data;
  }

  consultarTurno() {
    let consultaTurno: TurnoConsulta = {
      fechaDesde: this.formNewTurno.value.desde,
      fechaHasta: this.formNewTurno.value.hasta,
      especialidad: this.formNewTurno.value.especialidadControl.idEspecialidad,
      medico: this.formNewTurno.value.medicoControl.nroLegajo
    }
    this.consultarTurnoRest(consultaTurno);
  }

  consultarTurnoRest(turnoConsulta: TurnoConsulta) {
    this.turnoService.getTurnos(turnoConsulta).subscribe(
      data => this.turnosObtenidos(data)
    )
  }

  turnosObtenidos(turnos: any){
    this.futurosTurnos = [];
    turnos.forEach((unElemento,index) => {
      let unDiaHora = new Date(unElemento.fechaHora);
      this.futurosTurnos.push({
        position: index + 1,
        fecha: unDiaHora.toLocaleDateString(),
        hora: unDiaHora.toLocaleTimeString(),
        rango: unElemento.duracion,
        especialidad: unElemento.especialidad.descripcion,
        medico: unElemento.medico.nombre + " " + unElemento.medico.apellido
      })
      console.log(this.futurosTurnos);
    })

    this.dataSource.data = this.futurosTurnos;
  }
}