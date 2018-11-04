import { Component, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SimpleDialogComponent } from '../../dialog/simple-dialog/simple-dialog.component';
import { SecretariaService } from '../secretaria.service';
import { Secretaria } from '../../core/models/secretaria.model';
import { Router } from '@angular/router';
import { Permiso } from '../../core/interface/permiso';

//tabla
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

//tipo calendario
import {DateAdapter} from '@angular/material/core';
import { PermisoService } from '../../core/services/permiso.service';
import { PacienteService } from '../../paciente/paciente.service';
import { Paciente } from '../../core/models/paciente.model';
import { PacienteInterface } from '../../core/interface/paciente-interface';
import { PacienteFilter } from '../../core/interface/paciente-filter';

@Component({
  selector: 'app-secretaria/listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.css']
})
export class ListarPacientesComponent {
  grid= {
    nombre: {col: 2, row: 1},
    apellido: {col: 2, row: 1},
    permiso: {col: 1, row: 1},
    botonBuscar: {col: 1, row: 1},
    tabla: {col: 6, row: 4},
    espacioFinal: {col: 4, row: 1},
    botonSacarTurno: {col:1, row: 1},
    botonModificar: {col: 1, ro: 1}
  }

  public formGroup: FormGroup;
  public secretaria: Secretaria;

  //table
  tablaPacientes = new Array<PacienteInterface>();
  displayedColumns: string[] = ['position', 'nombreApellido', 'email', 'dni', 'select'];
  dataSource = new MatTableDataSource<PacienteInterface>(this.tablaPacientes);
  selection = new SelectionModel<PacienteInterface>(true, []);
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
        permiso: {col: 6, row: 1},
        botonBuscar: {col: 6, row: 1},
        tabla: {col: 6, row: 4},
        espacioFinal: {col: 4, row: 1},
        botonSacarTurno: {col:6, row: 1},
        botonModificar: {col: 6, ro: 1}
      }
      return;
    }
    //escritorio
    this.grid = {
      nombre: {col: 2, row: 1},
      apellido: {col: 2, row: 1},
      permiso: {col: 1, row: 1},
      botonBuscar: {col: 1, row: 1},
      tabla: {col: 6, row: 4},
      espacioFinal: {col: 4, row: 1},
      botonSacarTurno: {col:1, row: 1},
      botonModificar: {col: 1, ro: 1}
    }
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private adapter: DateAdapter<any>,
    private dialog: MatDialog,
    private secretariaService: SecretariaService,
    private pacienteService: PacienteService,
    private router: Router
    ) {}

  ngOnInit() {
    this.adapter.setLocale('mx');

    let unToken = this.secretariaService.getCurrentToken();
    this.secretariaService.getSecretaria(unToken).subscribe(
      data => this.correctSecretaria(data)
    )

    this.formGroup = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      dni: ['']
    });
  }

  correctSecretaria(data: Secretaria) {
    this.secretaria = data;
  }

  botonBuscar(){
    let pacienteFilter: PacienteFilter = new PacienteFilter();
    
    if (this.formGroup.value.nombre) {
      pacienteFilter.nombre = this.formGroup.value.nombre;
    }

    if (this.formGroup.value.apellido) {
      pacienteFilter.apellido = this.formGroup.value.apellido;
    }

    if (this.formGroup.value.dni) {
      pacienteFilter.dni = this.formGroup.value.dni;
    }

    this.pacienteService.getAllWithFilter(pacienteFilter).subscribe(
      data => this.pacientesObtenidos(data)
    )
  }

  solicitarTurno() {
    if (this.selection.selected.length == 0) {
      this.openDialogVacio();
      return false;
    }
    else {
      let pacienteSeleccionado: PacienteInterface;
      pacienteSeleccionado = this.selection.selected[0];
      this.router.navigate(['secretaria/paciente-turno', pacienteSeleccionado.dni]);
    }
  }

  botonVerTurnos(){
    if (this.selection.selected.length == 0) {
      this.openDialogVacio();
      return false;
    }
    else {
      let pacienteSeleccionado: PacienteInterface;
      pacienteSeleccionado = this.selection.selected[0];
      this.router.navigate(['secretaria/paciente', pacienteSeleccionado.dni]);
    }
  }

  pacientesObtenidos(pacientes: Paciente[]) {
    this.tablaPacientes = [];
    pacientes.forEach((unPaciente,index) => {
      this.tablaPacientes.push({
        position: index + 1,
        nombreApellido: unPaciente.nombre + " " + unPaciente.apellido,
        email: unPaciente.email,
        dni: unPaciente.dni
      })
    })
    this.dataSource.data = this.tablaPacientes;
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