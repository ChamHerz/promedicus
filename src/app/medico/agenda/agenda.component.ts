import { Component, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MedicoService } from '../../medico/medico.service';
import { TurnoService } from '../../core/services/turno.service';
import { DiaSemana } from '../../core/models/dia-semana.enum';
import { TurnoInterface } from '../../core/interface/turno-interface';
import { Router } from '@angular/router';

//dialogo
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TableTurnoDialogComponent } from '../../dialog/table-turno-dialog/table-turno-dialog.component';

//tabla
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

//tipo calendario
import {DateAdapter} from '@angular/material/core';

//Dias Select
import { MatSelectionList, MatListOption } from '@angular/material';
import { Turno } from '../../core/models/turno.model';
import { Medico } from '../../core/models/medico.model';
import { EstadoTurno } from '../../core/models/estado-turno.enum';

export interface PeriodicElement {
  position: number;
  desde: string;
  hasta: string;
  rango: number;
}

const rangoHorario: PeriodicElement[] = [
  {position: 1, desde: '8:00', hasta: "9:00", rango: 8},
  {position: 2, desde: '9:00', hasta: "10:00", rango: 9},
  {position: 3, desde: '10:00', hasta: "11:00", rango: 10},
  {position: 4, desde: '11:00', hasta: "12:00", rango: 11},
  {position: 5, desde: '12:00', hasta: "13:00", rango: 12},
  {position: 6, desde: '13:00', hasta: "14:00", rango: 13},
  {position: 7, desde: '14:00', hasta: "15:00", rango: 14},
  {position: 8, desde: '15:00', hasta: "16:00", rango: 15},
  {position: 9, desde: '16:00', hasta: "17:00", rango: 16},
  {position: 10, desde: '17:00', hasta: "18.00", rango: 17},
  {position: 10, desde: '18:00', hasta: "19.00", rango: 18}
];

@Component({
  selector: 'app-medico/agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {
  token: String;
  medico: Medico;
  displayedColumns: string[] = ['position', 'Desde', 'Hasta','select'];
  dataSource = new MatTableDataSource<PeriodicElement>(rangoHorario);
  selection = new SelectionModel<PeriodicElement>(true, []);
  turnosArray: TurnoInterface[];

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

  minDate: Date = new Date();
  maxDate: Date = new Date();

  grid = null;

  duraciones = [
    {tiempo: 15},
    {tiempo: 30},
    {tiempo: 45},
    {tiempo: 60}
  ]

  public formNewTurno: FormGroup;
  dias = [
    {dia: 'Lunes', diaSemana: DiaSemana.LUN},
    {dia: 'Martes', diaSemana: DiaSemana.MAR},
    {dia: 'Miercoles', diaSemana: DiaSemana.MIE},
    {dia: 'Jueves', diaSemana: DiaSemana.JUE},
    {dia: 'Viernes', diaSemana: DiaSemana.VIE},
    ];
  @ViewChild(MatSelectionList) diasList: MatSelectionList;

  layoutChanges = this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
    if(result.matches){
      //celular
      this.grid = {
        desde: {col: 6, row: 1},
        hasta: {col: 6, row: 1},
        duracion: {col: 6, row: 1},
        medico: {col: 6, row: 4},
        dia: {col: 6, row: 3},
        botonConfirmar: {col: 6, row: 1},
        tablaTurnos: {col: 6, row: 4}
      }
      return;
    }
    //escritorio
    this.grid = {
      desde: {col: 2, row: 1},
      hasta: {col: 2, row: 1},
      duracion: {col: 2, row: 1},
      medico: {col: 1, row: 4},
      dia: {col: 2, row: 3},
      botonConfirmar: {col: 2, row: 1},
      tablaTurnos: {col: 4, row: 4}
    }
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private medicoService: MedicoService,
    private turnoService: TurnoService,
    private adapter: DateAdapter<any>,
    private router: Router
    ) {}

  ngOnInit() {
    this.adapter.setLocale('mx');
    this.token = this.medicoService.getCurrentToken();
    this.maxDate.setDate(this.minDate.getDate() + 1);
    this.medicoService.getMedico(this.token).subscribe(
       data => this.correctMedico(data)
    )

    this.formNewTurno = this.formBuilder.group({
      desde: ['',[ Validators.required]],
      hasta: ['',[ Validators.required]],
      duracionControl: ['',[ Validators.required]]
    });

    //FUNCIONA PERO NO NECESITO ESTO AHORA
    // this.diasList.selectionChange.subscribe((s: MatSelectionListChange) => {          

    //   let listado: MatListOption[] = this.diasList.selectedOptions.selected;
    //   console.log(listado[0].value);
    //   //this.diasList.deselectAll();
    //   //s.option.selected = true;
    // });

  }

  correctMedico(data: any) {
    this.medico = new Medico();
    this.medico.setFromAny(data);
    console.log(this.medico);
  }

  openDialog(){
    this.showTurnos();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '400px';
    dialogConfig.data = { 
      title: "Turnos que se agregaran",
      body: "Le mandamos un email, verifique su cuenta.",
      turnos: this.turnosArray
    };
    const unDialgo = this.dialog.open(TableTurnoDialogComponent,dialogConfig);

    unDialgo.afterClosed().subscribe(result => {
      this.accionDialog(result);
    });
  }

  accionDialog(data: boolean):void {
    if (data) {
      let turnos = new Array<Turno>();
      this.turnosArray.forEach(unElemento => {
         turnos.push({
           nroLegajo: this.medico.nroLegajo,
           duracion: unElemento.duracionTurno,
           fechaHora: unElemento.fechaComienzo,
           estadoTurno: EstadoTurno.Disponible,
           idEspecialidad: this.medico.especialidad.idEspecialidad
         })
      });

      this.turnoService.addturnos(turnos).subscribe(
        data => this.correctAddTurnos(data)
      )

      console.log(turnos);

      //this.router.navigate(['/medico']);
    }
  }

  correctAddTurnos(data: Boolean) {
    console.log(data);
  }

  showTurnos(){
    let fechaStart: Date = this.formNewTurno.value.desde;
    fechaStart.setHours(8);
    fechaStart.setMinutes(0);
    fechaStart.setSeconds(0);
    let fechaEnding: Date = this.formNewTurno.value.hasta;
    fechaEnding.setHours(7);
    fechaEnding.setMinutes(0);
    fechaEnding.setSeconds(0);
    let duracion: number = this.formNewTurno.value.duracionControl.tiempo;
    let diasSeleccionados = new Array();

    let listado: MatListOption[] = this.diasList.selectedOptions.selected;
    listado.forEach(unElemento => {
      diasSeleccionados.push(unElemento.value.diaSemana);
    })

    let rangoHorarioSelect = new Array();
    this.selection.selected.forEach(unaHora => {
      rangoHorarioSelect.push(unaHora.rango);
    })
 
    this.turnosArray = this.generarTurnos(fechaStart,fechaEnding,duracion,diasSeleccionados,rangoHorarioSelect);
  }

  generarTurnos(
    fechaInicio: Date,
    fechaFinal: Date,
    duracion: number,
    diasSeleccionados: DiaSemana[],
    rangoHoras: number[]
  ) : TurnoInterface[] {
    //creador de fechas
    let fechaInteradora = new Date(fechaInicio);
    let turnos = new Array();
    let turno: TurnoInterface;
    while (fechaInteradora <= fechaFinal) {
      if (diasSeleccionados.some( x => x == fechaInteradora.getDay()))
        if (rangoHoras.some( x => x == fechaInteradora.getHours())){
          turno = {
            fechaComienzo: new Date(fechaInteradora),
            duracionTurno: duracion
          }
          turnos.push(turno);
        }
          //console.log(DiaSemana[fechaInteradora.getDay()] + ' ' + fechaInteradora.toLocaleString());
      fechaInteradora.setMinutes(fechaInteradora.getMinutes() + duracion);
    }
    return turnos;
  }

}
