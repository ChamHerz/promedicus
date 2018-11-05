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
import { DateAdapter} from '@angular/material/core';
import { EspecilidadService } from '../../core/services/especilidad.service';
import { Especialidad } from '../../core/models/especialidad.model';
import { MedicoService } from '../../medico/medico.service';
import { MedicoFilter } from '../../core/interface/medico-filter';
import { Medico } from '../../core/models/medico.model';
import { MedicoInterface } from '../../core/interface/medico-interface';

@Component({
  selector: 'app-secretaria/medicos-listar',
  templateUrl: './medicos-listar.component.html',
  styleUrls: ['./medicos-listar.component.css']
})
export class MedicosListarComponent {
  grid= {
    nombre: {col: 2, row: 1},
    apellido: {col: 2, row: 1},
    especialidad: {col: 1, row: 1},
    botonBuscar: {col: 1, row: 1},
    tabla: {col: 6, row: 4},
    espacioFinal: {col: 4, row: 1},
    botonSacarTurno: {col:1, row: 1},
    botonModificar: {col: 1, ro: 1}
  }

  public formGroup: FormGroup;
  public secretaria: Secretaria;
  public especialidades: Especialidad[];

  //table
  tablaMedicos = new Array<MedicoInterface>();
  displayedColumns: string[] = ['position', 'nombreApellido', 'especialidad', 'select'];
  dataSource = new MatTableDataSource<MedicoInterface>(this.tablaMedicos);
  selection = new SelectionModel<MedicoInterface>(true, []);
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
        especialidad: {col: 6, row: 1},
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
      especialidad: {col: 1, row: 1},
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
    private medicoService: MedicoService,
    private router: Router,
    private especialidadService: EspecilidadService
    ) {}

  ngOnInit() {
    this.adapter.setLocale('mx');

    this.especialidadService.getEspecialidades().subscribe(
      data => this.correctEspecialidades(data)
    )

    let unToken = this.secretariaService.getCurrentToken();
    this.secretariaService.getSecretaria(unToken).subscribe(
      data => this.correctSecretaria(data)
    )

    this.formGroup = this.formBuilder.group({
      nombre: [''],
      apellido: [''],
      especialidad: ['']
    });
  }

  correctEspecialidades(data: Especialidad[]) {
    this.especialidades = data;
  }

  correctSecretaria(data: Secretaria) {
    this.secretaria = data;
  }

  botonBuscar(){
    let medicoFilter: MedicoFilter = new MedicoFilter();
    
    if (this.formGroup.value.nombre) {
      medicoFilter.nombre = this.formGroup.value.nombre;
    }

    if (this.formGroup.value.apellido) {
      medicoFilter.apellido = this.formGroup.value.apellido;
    }

    if (this.formGroup.value.especialidad) {
      medicoFilter.idEspecialidad = this.formGroup.value.especialidad;
    }

    // this.medicoService.getAllWithFilter(medicoFilter).subscribe(
    //   data => this.medicosObtenidos(data)
    // )
    this.medicoService.getAllWithFilterOnlySecretary(this.secretaria.nroLegajo,medicoFilter).subscribe(
      data => this.medicosObtenidos(data)
    )
  }

  solicitarTurno() {
    // if (this.selection.selected.length == 0) {
    //   this.openDialogVacio();
    //   return false;
    // }
    // else {
    //   let pacienteSeleccionado: PacienteInterface;
    //   pacienteSeleccionado = this.selection.selected[0];
    //   this.router.navigate(['secretaria/paciente-turno', pacienteSeleccionado.dni]);
    // }
  }

  botonVerMedico(){
    if (this.selection.selected.length == 0) {
      this.openDialogVacio();
      return false;
    }
    else {
      let medicoiSeleccionado: MedicoInterface;
      medicoiSeleccionado = this.selection.selected[0];
      this.router.navigate(['secretaria/medico-modificar', medicoiSeleccionado.nroLegajo]);
    }
  }

  medicosObtenidos(medicos: Medico[]) {
     this.tablaMedicos = [];
     medicos.forEach((unMedico,index) => {
       this.tablaMedicos.push({
         position: index + 1,
         nombreApellido: unMedico.nombre + " " + unMedico.apellido,
         especialidad: this.especialidades.find(
           especialidad => especialidad.idEspecialidad == unMedico.especialidad).descripcion,
         nroLegajo: unMedico.nroLegajo
       })
     })
     this.dataSource.data = this.tablaMedicos;
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