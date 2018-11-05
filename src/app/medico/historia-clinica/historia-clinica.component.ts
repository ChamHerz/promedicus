import { Component } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmValidParentMatcher, CustomValidators } from '../../core/errors/custom-validators';
import { User } from '../../core/models/user.model';
import { Paciente } from '../../core/models/paciente.model';
import { UsuarioService } from '../../core/services/usuario.service';
import { ObraSocial } from '../../core/models/obra-social.model';
import { HistoriaClinica } from '../../core/models/historia-clinica';
import { HistoriaClinicaService } from '../../core/services/historia-clinica.service';
import { ObraSocialService } from '../../core/services/obra-social.service';
import { EstadoCivilService } from '../../core/services/estado-civil.service';
import { EstadoCivil } from '../../core/interface/estado-civil';
import { PacienteService } from '../../paciente/paciente.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SimpleDialogComponent } from '../../dialog/simple-dialog/simple-dialog.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { NativeDateAdapter, DateAdapter } from "@angular/material";

export interface Sexo {
  id: string;
  desc: string;
}

@Component({
  selector: 'app-medico/historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent {

  sexos: Sexo[] = [
    {id: "M", desc: "Masculino"},
    {id: "F", desc: "Femenino"},
    {id: "X", desc: "Indefinido"}
  ];
  
  grid= {
    datosFiliatorios: {col: 12, row: 0},
    nombre: {col: 2, row: 1},
    apellido: {col: 2, row: 1},
    edad: {col: 1, row: 1},
    sexo: {col: 1, row: 1},
    dni: {col: 2, row: 1},
    estadoCivil: {col: 2, row: 1},
    nacionalidad: {col: 2, row: 1},
    ocupacion: {col: 3, row: 1},
    fechaNacimiento: {col: 3, row: 1},
    instruccion: {col:3, row: 1},
    religion: {col:3, row: 1},
    residencia: {col:3, row: 1},
    residenciaAnterior: {col:3, row: 1},
    padresTitulo: {col:3, row: 1},
    padresTituloCausas: {col:9, row: 1},
    subtituloParentesco: {col:2, row: 1},
    padres: {col:1, row: 1},
    padresVivos: {col:1, row: 1},
    padresFallecidos: {col:1, row: 1},
    padresCausas: {col:7, row: 1},
    hermanos: {col:1, row: 1},
    hermanosVivos: {col:1, row: 1},
    hermanosFallecidos: {col:1, row: 1},
    hermanosCausas: {col:7, row: 1},
    hijos: {col:1, row: 1},
    hijosVivos: {col:1, row: 1},
    hijosFallecidos: {col:1, row: 1},
    hijosCausas: {col:7, row: 1},
    dbt: {col:1, row: 1},
    hta: {col:1, row: 1},
    tbc: {col:1, row: 1},
    gemelar: {col:1, row: 1},
    otrosHeredo: {col: 8, row: 1},
    cuadroDosxUno: {col: 2, row: 1},
    cuadroDiez: {col: 10, row: 1},

    espacioSeis: {col: 10, row: 1},
    antecedentes: {col: 12, row: 1},
    botonCambiarPass: {col: 1, row: 1},
    botonModificar: {col:2, row: 1}
  }

  public nombre = "";
  public apellido = "";
  public formGroup: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  public usuario: User;
  public paciente: Paciente;
  public listaObraSociales: ObraSocial[];
  public listaEstadoCiviles: EstadoCivil[];
  public dni: String;
  public historiaClinica: HistoriaClinica;

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private obraSocialService: ObraSocialService,
    private estadoCivilService: EstadoCivilService,
    private historiaClinicaService: HistoriaClinicaService,
    private pacienteService: PacienteService,
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private router: Router
    ) {
      this.dateAdapter.setLocale('fr'); 
    }

  ngOnInit() {
    this.listaEstadoCiviles = this.estadoCivilService.listaEstadoCivil;

    if (this.activeRoute.snapshot.params.dni) {
      this.dni = this.activeRoute.snapshot.params.dni;
    }

    // console.log("antes del user", this.dni);
    // this.usuarioService.get(this.dni).subscribe(
    //   data => this.correctCargaUser(data)
    // )

    this.pacienteService.getByDni(this.dni).subscribe(
      data => this.correctCargaPaciente(data)
    )

    // this.obraSocialService.getObraSociales().subscribe(
    //   data => this.correctObraSociales(data)
    // )

    

    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      sexo: [''],
      dni: ['',[Validators.required]],
      estadoCivil: [''],
      nacionalidad: [''],
      ocupacion: [''],
      fechaNacimiento: [''],
      instruccion: [''],
      religion: [''],
      residencia: [''],
      residenciaAnterior: [''],
      padres: [''],
      padresVivos: [''],
      padresFallecidos: [''],
      padresCausas: [''],
      hermanos: [''],
      hermanosVivos: [''],
      hermanosFallecidos: [''],
      hermanosCausas: [''],
      hijos: [''],
      hijosVivos: [''],
      hijosFallecidos: [''],
      hijosCausas: [''],
      dbt: [''],
      hta: [''],
      tbc: [''],
      gemelar: [''],
      otrosHeredo: [''],
      alcohol: [''],
      tabaco: [''],
      drogas: [''],
      infusiones: [''],
      infancia: [''],
      adulto: [''],
      quirurgicos: [''],
      traumatologicos: [''],
      alergicos: [''],
      otrosPersonales: ['']

    });
  }

  correctCargaUser(data: User) {
    this.usuario = data;
  }

  correctCargaPaciente(data: Paciente) {
    this.paciente = data;

    console.log(this.paciente);

    this.formGroup.patchValue({
      "sexo":this.paciente.sexo
    })

    this.nombre = this.paciente.nombre;
    this.apellido = this.paciente.apellido;

    this.formGroup.patchValue(this.paciente);

    this.historiaClinicaService.getHistoriaClinica(this.paciente.dni).subscribe(
      data => this.correctCargaHistoriaClinica(data)
    )

    

    // this.formGroup.setValue({
    //   "nombre": this.paciente.nombre,
    //   "apellido": this.paciente.apellido,
    //   "dni": this.paciente.dni,
    //   "direccion": this.paciente.direccion,
    //   "estadoCivil": this.paciente.estadoCivil,
    //   "telefono": this.paciente.telefono,
    //   "idObraSocial": this.paciente.idObraSocial,
    //   "emailGroup": {
    //     "email": this.paciente.email,
    //     "emailConfirm": this.paciente.email
    //   },
    //   "passGroup": {
    //     "pass": "***************",
    //     "passConfirm": "***************",
    //   }
    // });
  }

  correctCargaHistoriaClinica(data: HistoriaClinica){
    this.historiaClinica = data;

    this.formGroup.patchValue(this.historiaClinica);

    let fechaNacimiento = new Date(this.historiaClinica.fechaNacimiento);
    let ageDifMs = Date.now() - fechaNacimiento.getTime();
    let ageDate = new Date(ageDifMs);
    let edadFinal = Math.abs(ageDate.getUTCFullYear() - 1970);

    this.formGroup.patchValue({
      "edad": edadFinal
    })
  }

  correctObraSociales(data: ObraSocial[]){
    this.listaObraSociales = data;
  }

  botonRegistrar(){
    
    this.usuario = {
      email: this.formGroup.value.emailGroup.email,
      nivelPermiso: 0,
      activo: true,
      emailConfirm: true,
      pathReset: '',
      nombre: this.formGroup.value.nombre,
      apellido: this.formGroup.value.apellido
    }

    console.log(this.usuario);

    this.usuarioService.updateUsuario(this.usuario).subscribe(
      data => this.correctUsuario(data)
    )

    this.paciente = {
      nombre: this.formGroup.value.nombre,
      apellido: this.formGroup.value.apellido,
      direccion: this.formGroup.value.direccion,
      estadoCivil: this.formGroup.value.estadoCivil,
      telefono: this.formGroup.value.telefono,
      idObraSocial: this.formGroup.value.idObraSocial,
      dni: "999999",
      email: this.formGroup.value.emailGroup.email
    }

    this.pacienteService.updatePaciente(this.paciente).subscribe(
      data => this.correctPaciente(data)
    )

    this.openDialogExito();

    return false;
  }

  correctUsuario(data: User) {
    if (data) {
      
    }
  }

  correctPaciente(data: Boolean) {
    if (data) {
      
    }
  }

  cambiarPass(){
    console.log("cambiar pass");
    this.router.navigate(['reset-pass', this.usuario.pathReset]);
    return false;
  }

  openDialogExito(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: "Resultado de Modificacion",
      body: "Datos actualizado con exito, Gracias"
    };
    const unDialgo = this.dialog.open(SimpleDialogComponent,dialogConfig);

    unDialgo.afterClosed().subscribe(result => {
      
    });
  }
}