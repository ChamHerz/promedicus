import { Component, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SimpleDialogComponent } from '../../dialog/simple-dialog/simple-dialog.component';
import { AdminService } from '../admin.service';
import { Admin } from '../../core/models/admin.model';
import { Router } from '@angular/router';
import { Permiso } from '../../core/interface/permiso';
import { User } from '../../core/models/user.model';
import { EstadoBoolService } from '../../core/services/estado-bool.service';
import { UsuarioFilter } from '../../core/interface/usuario-filter';

//tabla
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

//tipo calendario
import {DateAdapter} from '@angular/material/core';
import { PermisoService } from '../../core/services/permiso.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { UsuarioInterface } from '../../core/interface/usuario-interface';

@Component({
  selector: 'app-admin/listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent {
  grid= {
    nombre: {col: 2, row: 1},
    apellido: {col: 2, row: 1},
    permiso: {col: 1, row: 1},
    botonBuscar: {col: 1, row: 1},
    tabla: {col: 6, row: 4},
    selectorUsuario: {col: 1, row: 1},
    crearUsuario: {col: 1, row: 1},
    espacioFinal: {col: 1, row: 1},
    botonModificar: {col: 1, row: 1},
    botonActivar: {col: 1, row: 1},
    botonDesactivar: {col: 1, row: 1}
  }

  public formGroup: FormGroup;
  public formNewUser: FormGroup;
  public admin: Admin;
  public listaUsuarios: User[];

  //table
  tablaUsuarios = new Array<UsuarioInterface>();
  displayedColumns: string[] = ['position', 'nombreApellido', 'email', 'permiso', 'estado', 'select'];
  dataSource = new MatTableDataSource<UsuarioInterface>(this.tablaUsuarios);
  selection = new SelectionModel<UsuarioInterface>(true, []);
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
        selectorUsuario: {col: 1, row: 1},
        crearUsuario: {col: 1, row: 1},
        espacioFinal: {col: 1, row: 1},
        botonModificar: {col: 6, row: 1},
        botonActivar: {col: 6, row: 1},
        botonDesactivar: {col: 6, row: 1}
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
      selectorUsuario: {col: 1, row: 1},
      crearUsuario: {col: 1, row: 1},
      espacioFinal: {col: 1, row: 1},
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
    private usuarioService: UsuarioService,
    private router: Router,
    private permisoService: PermisoService,
    private estadoBoolService: EstadoBoolService
    ) {}

  ngOnInit() {
    this.adapter.setLocale('mx');

    this.permisos = this.permisoService.listaPermisos;

    let unToken = this.adminService.getCurrentToken();
    this.adminService.getAdmin(unToken).subscribe(
      data => this.correctAdmin(data)
    )

    this.formGroup = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      permiso: ['']
    });

    this.formNewUser = this.formBuilder.group({
      usuario: ['',[Validators.required]]
    });
  }

  correctAdmin(data: Admin) {
    this.admin = data;
  }

  botonBuscar(){
    let usuarioFilter: UsuarioFilter = new UsuarioFilter();
    
    if (this.formGroup.value.nombre) {
      usuarioFilter.nombre = this.formGroup.value.nombre;
    }

    if (this.formGroup.value.apellido) {
      usuarioFilter.apellido = this.formGroup.value.apellido;
    }

    if (this.formGroup.value.permiso) {
      if (this.formGroup.value.permiso != -1)
        usuarioFilter.idPermiso = this.formGroup.value.permiso;
    }

    this.usuarioService.getAllWithFilter(usuarioFilter).subscribe(
      data => this.usuariosObtenidos(data)
    )
  }

  usuariosObtenidos(usuarios: User[]) {
    this.tablaUsuarios = [];
    usuarios.forEach((unUsuario,index) => {
      this.tablaUsuarios.push({
        position: index + 1,
        nombreApellido: unUsuario.nombre + " " + unUsuario.apellido,
        email: unUsuario.email,
        estado: this.estadoBoolService.getEstadoBool(unUsuario.activo),
        permiso: this.permisoService.getPermiso(unUsuario.nivelPermiso)
      })
    })
    this.dataSource.data = this.tablaUsuarios;
  }

  botonDesactivar() {
    if (this.selection.selected.length == 0) {
      this.openDialogVacio();
      return false;
    }
    else {
      let usuarioSeleccionado: UsuarioInterface;
      usuarioSeleccionado = this.selection.selected[0];
      this.usuarioService.desactivar(usuarioSeleccionado.email).subscribe(
        data => this.correctCambioEstado(data)
      )
    }
  }

  botonActivar() {
    if (this.selection.selected.length == 0) {
      this.openDialogVacio();
      return false;
    }
    else {
      let usuarioSeleccionado: UsuarioInterface;
      usuarioSeleccionado = this.selection.selected[0];
      this.usuarioService.activar(usuarioSeleccionado.email).subscribe(
        data => this.correctCambioEstado(data)
      )
    }
  }

  correctCambioEstado(data: Boolean) {
    if (data) {
      this.botonBuscar();
    }
  }

  botonModificar() {
    if (this.selection.selected.length == 0) {
      this.openDialogVacio();
      return false;
    }
    else {
      let usuarioSeleccionado: UsuarioInterface;
      usuarioSeleccionado = this.selection.selected[0];
      if (usuarioSeleccionado.permiso == "Paciente") {
        this.router.navigate(['/admin/paciente',usuarioSeleccionado.email]);
      }

      if (usuarioSeleccionado.permiso == "Medico") {
        this.router.navigate(['/admin/medico',usuarioSeleccionado.email]);
      }
    }
    return false;
  }

  crearUsuario() {
    console.log(this.formNewUser.value.usuario);
    if (this.formNewUser.value.usuario == 0) {
      this.router.navigate(['/admin/paciente']);
    }
    if (this.formNewUser.value.usuario == 2) {
      this.router.navigate(['/admin/medico']);
    }
  }

  openDialogVacio(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: "Resultado de Cambio de estado",
      body: "Tiene que seleccionar al menos un usuario"
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