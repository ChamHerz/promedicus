import { Component, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SimpleDialogComponent } from '../../dialog/simple-dialog/simple-dialog.component';
import { AdminService } from '../../admin/admin.service';
import { Secretaria } from '../../core/models/secretaria.model';
import { Router } from '@angular/router';
import { Permiso } from '../../core/interface/permiso';
import { ObraSocialService } from '../../core/services/obra-social.service';

//tabla
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

//tipo calendario
import {DateAdapter} from '@angular/material/core';
import { PermisoService } from '../../core/services/permiso.service';
import { PacienteService } from '../../paciente/paciente.service';
import { Paciente } from '../../core/models/paciente.model';
import { ObraSocialInterface } from '../../core/interface/obra-social.interface';
import { PacienteFilter } from '../../core/interface/paciente-filter';
import { ObraSocial } from '../../core/models/obra-social.model';
import { EstadoBoolService } from '../../core/services/estado-bool.service';

@Component({
  selector: 'app-admin/listar-obra-sociales',
  templateUrl: './listar-obra-sociales.component.html',
  styleUrls: ['./listar-obra-sociales.component.css']
})
export class ListarObraSocialesComponent {
  grid= {
    nombre: {col: 2, row: 1},
    apellido: {col: 1, row: 1},
    denominacion: {col: 2, row: 1},
    botonBuscar: {col: 1, row: 1},
    tabla: {col: 6, row: 4},
    espacioFinal: {col: 3, row: 1},
    botonModificar: {col: 1, row: 1},
    botonActivar: {col: 1, row: 1},
    botonDesactivar: {col: 1, row: 1}
  }

  public formGroup: FormGroup;
  public secretaria: Secretaria;
  public listaObraSociales: ObraSocial[];

  //table
  tablaObraSociales = new Array<ObraSocialInterface>();
  displayedColumns: string[] = ['position', 'sigla', 'denominacion', 'cuit', 'activa', 'select'];
  dataSource = new MatTableDataSource<ObraSocialInterface>(this.tablaObraSociales);
  selection = new SelectionModel<ObraSocialInterface>(true, []);
  permisos: Permiso[];

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
        nombre: {col: 6, row: 1},
        apellido: {col: 6, row: 1},
        denominacion: {col: 6, row: 1},
        botonBuscar: {col: 6, row: 1},
        tabla: {col: 6, row: 4},
        espacioFinal: {col: 6, row: 1},
        botonModificar: {col: 6, row: 1},
        botonActivar: {col: 6, row: 1},
        botonDesactivar: {col: 6, row: 1}
      }
      return;
    }
    //escritorio
    this.grid = {
      nombre: {col: 2, row: 1},
      apellido: {col: 1, row: 1},
      denominacion: {col: 2, row: 1},
      botonBuscar: {col: 1, row: 1},
      tabla: {col: 6, row: 4},
      espacioFinal: {col: 3, row: 1},
      botonModificar: {col: 1, row: 1},
      botonActivar: {col: 1, row: 1},
      botonDesactivar: {col: 1, row: 1}
    }
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private adapter: DateAdapter<any>,
    private dialog: MatDialog,
    private adminService: AdminService,
    private pacienteService: PacienteService,
    private router: Router,
    private obraSocialesService: ObraSocialService,
    private estadoBoolService: EstadoBoolService
    ) {}

  ngOnInit() {
    this.adapter.setLocale('mx');

    this.formGroup = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      denominacion: ['']
    });
  }

  correctSecretaria(data: Secretaria) {
    this.secretaria = data;
  }

  botonBuscar(){
    this.tablaObraSociales = [];
    let denomi;

    if (this.formGroup.value.denominacion) {
      denomi = this.formGroup.value.denominacion;
      this.obraSocialesService.getObraSocialesByDenomicacion(denomi).subscribe(
        data => this.ObraSocialesObtenidas(data)
      )
    }
    else {
      this.obraSocialesService.getObraSociales().subscribe(
        data => this.ObraSocialesObtenidas(data)
      )
    }

  }

  ObraSocialesObtenidas(data: ObraSocial[]){
    this.listaObraSociales = data;
    console.log(this.listaObraSociales);

    this.tablaObraSociales = [];
    this.listaObraSociales.forEach((unPaciente,index) => {
      this.tablaObraSociales.push({
        position: index + 1,
        idObraSocial: unPaciente.idObraSocial,
        sigla: unPaciente.sigla,
        denominacion: unPaciente.denominacion,
        cuit: unPaciente.cuit,
        activa: this.estadoBoolService.getEstadoBool(unPaciente.activa)
      })
    })
    this.dataSource.data = this.tablaObraSociales;
  }

  botonDesactivar() {
    if (this.selection.selected.length == 0) {
      this.openDialogVacio();
      return false;
    }
    else {
      let obraSocialSeleccionado: ObraSocialInterface;
      obraSocialSeleccionado = this.selection.selected[0];
      this.obraSocialesService.desactivar(obraSocialSeleccionado.idObraSocial).subscribe(
        data => this.correctCambioEstado(data)
      )
    }
  }

  correctCambioEstado(data: Boolean) {
    if (data) {
      this.botonBuscar();
    }
  }

  botonVerTurnos(){
    if (this.selection.selected.length == 0) {
      this.openDialogVacio();
      return false;
    }
    else {
      //let pacienteSeleccionado: PacienteInterface;
      //pacienteSeleccionado = this.selection.selected[0];
      //this.router.navigate(['secretaria/paciente', pacienteSeleccionado.dni]);
    }
  }

  botonActivar(pacientes: Paciente[]) {
    if (this.selection.selected.length == 0) {
      this.openDialogVacio();
      return false;
    }
    else {
      let obraSocialSeleccionado: ObraSocialInterface;
      obraSocialSeleccionado = this.selection.selected[0];
      this.obraSocialesService.activar(obraSocialSeleccionado.idObraSocial).subscribe(
        data => this.correctCambioEstado(data)
      )
    }
  }

  openDialogVacio(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: "Resultado",
      body: "Tiene que seleccionar al menos un paciente"
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
      body: "Te enviamos un Email con los datos del turno, Gracias"
    };
    const unDialgo = this.dialog.open(SimpleDialogComponent,dialogConfig);

    unDialgo.afterClosed().subscribe(result => {
      this.router.navigate(['/paciente/turno-paciente']);
    });
  }
}