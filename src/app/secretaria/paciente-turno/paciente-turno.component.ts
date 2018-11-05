import { Component } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from '../../core/models/especialidad.model';
import { Medico } from '../../core/models/medico.model';
import { PacienteService } from '../../paciente/paciente.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SimpleDialogComponent } from '../../dialog/simple-dialog/simple-dialog.component';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { FuturosTurnos } from '../../core/interface/futuros-turnos';

//tabla
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { TurnoService } from '../../core/services/turno.service'
import { TurnoConsulta } from '../../core/interface/turno-consulta';

//tipo calendario
import {DateAdapter} from '@angular/material/core';
import { EstadoTurnoInterface } from '../../core/interface/estado-turno-interface';
import { EstadoTurnoService } from '../../core/services/estado-turno.service';
import { Paciente } from '../../core/models/paciente.model';

@Component({
  selector: 'app-secretaria/paciente-turno',
  templateUrl: './paciente-turno.component.html',
  styleUrls: ['./paciente-turno.component.css']
})
export class PacienteTurnoComponent {
  minDate: Date = new Date();
  maxDate: Date = new Date();

  grid= {
    espacioPrincipio: {col: 4, row: 1},
    estado: {col: 1, row: 1},
    botonBuscar: {col: 1, row: 1},
    tablaTurnos: {col: 6, row: 4},
    espacioFinal: {col: 4, row: 1},
    botonConfirmar: {col: 1, row: 1}, 
    botonCancelar: {col: 1, row: 1}
  }

  public formNewTurno: FormGroup;
  public especialidades: Especialidad[];
  public medicos: Medico[];
  public paciente: Paciente;
  public dniPaciente: String;

  //table
  futurosTurnos = new Array<FuturosTurnos>();
  displayedColumns: string[] = ['position', 'Fecha', 'Hora', 'Especialidad','Estado', 'Medico','select'];
  dataSource = new MatTableDataSource<FuturosTurnos>(this.futurosTurnos);
  selection = new SelectionModel<FuturosTurnos>(true, []);
  estadoTurnos: EstadoTurnoInterface[];

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
        espacioPrincipio: {col: 6, row: 1},
        estado: {col: 6, row: 1},
        botonBuscar: {col: 6, row: 1},
        tablaTurnos: {col: 6, row: 4},
        espacioFinal: {col: 6, row: 1},
        botonConfirmar: {col: 6, row: 1}, 
        botonCancelar: {col: 6, row: 1}
      }
      return;
    }
    //escritorio
    this.grid = {
      espacioPrincipio: {col: 4, row: 1},
      estado: {col: 1, row: 1},
      botonBuscar: {col: 1, row: 1},
      tablaTurnos: {col: 6, row: 4},
      espacioFinal: {col: 4, row: 1},
      botonConfirmar: {col: 1, row: 1}, 
      botonCancelar: {col: 1, row: 1}
    }
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private adapter: DateAdapter<any>,
    private turnoService: TurnoService,
    private estadoTurnoService: EstadoTurnoService,
    private pacienteService: PacienteService,
    private dialog: MatDialog,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) {}

  ngOnInit() {
    this.paciente = new Paciente();
    this.estadoTurnos = this.estadoTurnoService.listaEstadoTurnos;
    this.adapter.setLocale('mx');

    this.dniPaciente = this.activeRoute.snapshot.params.dni;
    console.log(this.dniPaciente);

    this.pacienteService.getByDni(this.dniPaciente).subscribe(
      data => this.correctPaciente(data)
    )

     this.formNewTurno = this.formBuilder.group({
       estadoTurnoControl: [1]
     });

  }

  correctPaciente(data: Paciente) {
    this.paciente = data;
    console.log(this.paciente);
    let dni = Number(this.paciente.dni);
    this.realizarConsultarTurnos(dni,1);
  }

  realizarConsultarTurnos(dni: number, estado: number){
    this.turnoService.getTurnosDePaciente(dni,estado).subscribe(
      data => this.turnosObtenidos(data)
    );
  }

  consultarTurno() {
    console.log("consultar turno",this.formNewTurno.value.estadoTurnoControl);
    let dni = Number(this.paciente.dni);
    this.realizarConsultarTurnos(dni,this.formNewTurno.value.estadoTurnoControl);
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
        estado: this.estadoTurnoService.getEstado(unElemento.estadoTurno),
        medico: unElemento.medico.nombre + " " + unElemento.medico.apellido,
        idTurno: unElemento.idTurno
      })
     
    })

    this.dataSource.data = this.futurosTurnos;
  }

  confirmarTurno() {
    if (this.selection.selected.length == 0) {
      this.openDialogVacio();
      return false;
    }
    else {
      let turnoSeleccionado: FuturosTurnos;
      turnoSeleccionado = this.selection.selected[0];
      console.log(turnoSeleccionado.idTurno);

      let dni = Number(this.paciente.dni);

      this.turnoService.confirmarTurno(turnoSeleccionado.idTurno).subscribe(
        data => this.resultadoSolicitudTurno(data, "Confirmado")
      )

    }
  }

  cancelarTurno() {
    if (this.selection.selected.length == 0) {
      this.openDialogVacio();
      return false;
    }
    else {
      let turnoSeleccionado: FuturosTurnos;
      turnoSeleccionado = this.selection.selected[0];
      console.log(turnoSeleccionado.idTurno);

      let dni = Number(this.paciente.dni);

      this.turnoService.cancelarTurno(turnoSeleccionado.idTurno,dni).subscribe(
        data => this.resultadoSolicitudTurno(data, "Cancelado")
      )

    }
  }

  resultadoSolicitudTurno(data: Boolean, estado: String) {
    if (data) {
      this.openDialogExito(estado);
    }
  }

  openDialogVacio(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: "Resultado",
      body: "Tiene que seleccionar al menos un turno "
    };
    const unDialgo = this.dialog.open(SimpleDialogComponent,dialogConfig);

    unDialgo.afterClosed().subscribe(result => {
      //this.goToLogin()
    });
  }

  openDialogExito(estado: String){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: "Resultado de Turno",
      body: "turno " + estado + ", Gracias"
    };
    const unDialgo = this.dialog.open(SimpleDialogComponent,dialogConfig);

    unDialgo.afterClosed().subscribe(result => {
      this.consultarTurno();
    });
  }

}