import { Component, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from '../../core/models/especialidad.model';
import { EspecilidadService } from '../../core/services/especilidad.service';
import { Medico } from '../../core/models/medico.model';
import { MedicoService } from '../../medico/medico.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SimpleDialogComponent } from '../../dialog/simple-dialog/simple-dialog.component';
import { PacienteService } from '../../paciente/paciente.service';
import { Router } from '@angular/router';
import { FuturosTurnos } from '../../core/interface/futuros-turnos';
import { ActivatedRoute, Params } from '@angular/router';

//tabla
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { TurnoService } from '../../core/services/turno.service'
import { TurnoConsulta } from '../../core/interface/turno-consulta';

//tipo calendario
import {DateAdapter} from '@angular/material/core';
import { Paciente } from '../../core/models/paciente.model';

@Component({
  selector: 'app-secretaria/paciente-new-turno',
  templateUrl: './paciente-new-turno.component.html',
  styleUrls: ['./paciente-new-turno.component.css']
})
export class PacienteNewTurnoComponent {
  minDate: Date = new Date();
  maxDate: Date = new Date();

  grid= {
    desde: {col: 1, row: 1},
    hasta: {col: 1, row: 1},
    especialidad: {col: 1, row: 1},
    medico: {col: 2, row: 1},
    botonConfirmar: {col: 1, row: 1},
    tablaTurnos: {col: 6, row: 4},
    espacioFinal: {col: 5, row: 1},
    botonSolicitar: {col: 1, ro: 1}
  }

  public formNewTurno: FormGroup;
  public especialidades: Especialidad[];
  public medicos: Medico[];
  public paciente: Paciente;
  public dniPaciente: String;

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
        tablaTurnos: {col: 6, row: 4},
        espacioFinal: {col: 6, row: 1},
        botonSolicitar: {col: 6, ro: 1}
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
      tablaTurnos: {col: 6, row: 4},
      espacioFinal: {col: 5, row: 1},
      botonSolicitar: {col: 1, ro: 1}
    }
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private adapter: DateAdapter<any>,
    private especialidadService: EspecilidadService,
    private medicoService: MedicoService,
    private turnoService: TurnoService,
    private dialog: MatDialog,
    private pacienteService: PacienteService,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) {}

  ngOnInit() {
    this.adapter.setLocale('mx');

    this.paciente = new Paciente();
    this.dniPaciente = this.activeRoute.snapshot.params.dni;
    this.pacienteService.getByDni(this.dniPaciente).subscribe(
      data => this.correctPaciente(data)
    )

    // let unToken = this.pacienteService.getCurrentToken();
    // this.pacienteService.get(unToken).subscribe(
    //   data => this.correctPaciente(data)
    // )

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

  correctPaciente(data: Paciente) {
    this.paciente = data;
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
        medico: unElemento.medico.nombre + " " + unElemento.medico.apellido,
        idTurno: unElemento.idTurno
      })
      //console.log(this.futurosTurnos);
    })

    this.dataSource.data = this.futurosTurnos;
  }

  solicitarTurno() {
    
    if (this.selection.selected.length == 0) {
      this.openDialogVacio();
      return false;
    }
    else {
      let turnoSeleccionado: FuturosTurnos;
      turnoSeleccionado = this.selection.selected[0];
      console.log(turnoSeleccionado.idTurno);

      let dni = Number(this.paciente.dni);

      this.turnoService.solicitarTurno(turnoSeleccionado.idTurno,dni).subscribe(
        data => this.resultadoSolicitudTurno(data)
      )
      //console.log(this.paciente);
    }

    return false;
  }

  resultadoSolicitudTurno(data: Boolean) {
    if (data) {
      this.openDialogExito();
    }
  }

  openDialogVacio(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: "Resultado de Solicitud de Turno",
      body: "Tiene que seleccionar al menos un turno "
    };
    const unDialgo = this.dialog.open(SimpleDialogComponent,dialogConfig);

    unDialgo.afterClosed().subscribe(result => {
      //this.goToLogin()
    });
  }

  openDialogExito(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: "Resultado de Solicitud de Turno",
      body: "Le enviamos un Email al paciente que solicito turno, Gracias"
    };
    const unDialgo = this.dialog.open(SimpleDialogComponent,dialogConfig);

    unDialgo.afterClosed().subscribe(result => {
      this.consultarTurno();
    });
  }
}