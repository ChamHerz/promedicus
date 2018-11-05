import { Component } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from '../../core/models/especialidad.model';
import { Medico } from '../../core/models/medico.model';
import { MedicoService } from '../../medico/medico.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SimpleDialogComponent } from '../../dialog/simple-dialog/simple-dialog.component';
import { Router } from '@angular/router';

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

export interface FuturosTurnos {
  position: number;
  fecha: string;
  hora: string;
  rango: number;
  especialidad: string;
  estado: String;
  medico: string;
  idTurno: number;
}

@Component({
  selector: 'app-medico/mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent {
  minDate: Date = new Date();
  maxDate: Date = new Date();

  grid= {
    desde: {col: 1, row: 1},
    hasta: {col: 1, row: 1},
    especialidad: {col: 1, row: 1},
    medico: {col: 2, row: 1},
    botonConfirmar: {col: 1, row: 1},
    tablaTurnos: {col: 6, row: 4},
    espacioCinco: {col: 5, row: 1},
    botonCancelar: {col: 1, row: 1}
  }

  public formNewTurno: FormGroup;
  public especialidades: Especialidad[];
  public medicos: Medico[];
  public medico: Medico;

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
        desde: {col: 6, row: 1},
        hasta: {col: 6, row: 1},
        especialidad: {col: 6, row: 1},
        medico: {col: 6, row: 1},
        botonConfirmar: {col: 6, row: 1},
        tablaTurnos: {col: 6, row: 4},
        espacioCinco: {col: 5, row: 1},
        botonCancelar: {col: 1, row: 1}
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
      espacioCinco: {col: 5, row: 1},
      botonCancelar: {col: 1, row: 1}
    }
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private adapter: DateAdapter<any>,
    private turnoService: TurnoService,
    private estadoTurnoService: EstadoTurnoService,
    private medicoService: MedicoService,
    private dialog: MatDialog,
    private router: Router
    ) {}

  ngOnInit() {
    this.estadoTurnos = this.estadoTurnoService.listaEstadoTurnos;

    this.adapter.setLocale('mx');

    let unToken = this.medicoService.getCurrentToken();
    console.log("token",unToken);

    this.medicoService.getMedico(unToken).subscribe(
      data => this.correctMedico(data)
    )

    this.formNewTurno = this.formBuilder.group({
      estadoTurnoControl: [1]
    });

  }

  correctMedico(data: Medico) {
    this.medico = data;
    let nroLegajo = Number(this.medico.nroLegajo);
    this.realizarConsultarTurnos(nroLegajo,1);
  }

  realizarConsultarTurnos(nroLegajo: number, estado: number){
    this.turnoService.getTurnosDeMedico(nroLegajo,estado).subscribe(
      data => this.turnosObtenidos(data)
    );
  }

  consultarTurno() {
    console.log("consultar turno",this.formNewTurno.value.estadoTurnoControl);
    let nroLegajo = Number(this.medico.nroLegajo);
    this.realizarConsultarTurnos(nroLegajo,this.formNewTurno.value.estadoTurnoControl);
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

  // cancelarTurno() {
  //   if (this.selection.selected.length == 0) {
  //     this.openDialogVacio();
  //     return false;
  //   }
  //   else {
  //     let turnoSeleccionado: FuturosTurnos;
  //     turnoSeleccionado = this.selection.selected[0];
  //     console.log(turnoSeleccionado.idTurno);

  //     let dni = Number(this.paciente.dni);

  //     this.turnoService.cancelarTurno(turnoSeleccionado.idTurno,dni).subscribe(
  //       data => this.resultadoSolicitudTurno(data)
  //     )

  //   }
  // }

  resultadoSolicitudTurno(data: Boolean) {
    if (data) {
      this.openDialogExito();
    }
  }

  openDialogVacio(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: "Resultado de Cancelacion de Turno",
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
      title: "Resultado de Cancelacion de Turno",
      body: "turno cancelado, Gracias"
    };
    const unDialgo = this.dialog.open(SimpleDialogComponent,dialogConfig);

    unDialgo.afterClosed().subscribe(result => {
      this.router.navigate(['/paciente/turno-paciente']);
    });
  }
}