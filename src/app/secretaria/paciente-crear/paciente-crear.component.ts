import { Component } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmValidParentMatcher, CustomValidators } from '../../core/errors/custom-validators';
import { User } from '../../core/models/user.model';
import { Paciente } from '../../core/models/paciente.model';
import { UsuarioService } from '../../core/services/usuario.service';
import { ObraSocial } from '../../core/models/obra-social.model';
import { ObraSocialService } from '../../core/services/obra-social.service';
import { EstadoCivilService } from '../../core/services/estado-civil.service';
import { EstadoCivil } from '../../core/interface/estado-civil';
import { PacienteService } from '../../paciente/paciente.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SimpleDialogComponent } from '../../dialog/simple-dialog/simple-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secretaria/paciente-crear',
  templateUrl: './paciente-crear.component.html',
  styleUrls: ['./paciente-crear.component.css']
})
export class PacienteCrearComponent {
  grid= {
    nombre: {col: 3, row: 1},
    apellido: {col: 3, row: 1},
    dni: {col: 1, row: 1},
    espacioDos: {col: 2, row: 1},
    direccion: {col: 2, row: 1},
    numero: {col: 1, row: 1},
    estadoCivil: {col: 1, row: 1},
    telefono: {col: 2, row: 1},
    obraSocial: {col: 2, row: 1},
    email: {col:3, row: 1},
    emailConfirm: {col:3, row: 1},
    pass: {col:3, row: 1},
    passConfirm: {col:3, row: 1},
    espacioFinal: {col: 5, row: 1},
    botonSacarTurno: {col:1, row: 1}
  }

  public formGroup: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  public usuario: User;
  public paciente: Paciente;
  public listaObraSociales: ObraSocial[];
  public listaEstadoCiviles: EstadoCivil[];

  layoutChanges = this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
    if(result.matches){
      //celular
      this.grid = {
        nombre: {col: 6, row: 1},
        apellido: {col: 6, row: 1},
        dni: {col: 6, row: 1},
        espacioDos: {col: 6, row: 1},
        direccion: {col: 6, row: 1},
        numero: {col: 6, row: 1},
        estadoCivil: {col: 6, row: 1},
        telefono: {col: 6, row: 1},
        obraSocial: {col: 6, row: 1},
        email: {col:6, row: 1},
        emailConfirm: {col:6, row: 1},
        pass: {col:6, row: 1},
        passConfirm: {col:6, row: 1},
        espacioFinal: {col: 6, row: 1},
        botonSacarTurno: {col:6, row: 1}
      }
      return;
    }
    //escritorio
    this.grid = {
      nombre: {col: 3, row: 1},
      apellido: {col: 3, row: 1},
      dni: {col: 1, row: 1},
      espacioDos: {col: 2, row: 1},
      direccion: {col: 2, row: 1},
      numero: {col: 1, row: 1},
      estadoCivil: {col: 1, row: 1},
      telefono: {col: 2, row: 1},
      obraSocial: {col: 2, row: 1},
      email: {col:3, row: 1},
      emailConfirm: {col:3, row: 1},
      pass: {col:3, row: 1},
      passConfirm: {col:3, row: 1},
      espacioFinal: {col: 5, row: 1},
      botonSacarTurno: {col:1, row: 1}
    }
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private obraSocialService: ObraSocialService,
    private estadoCivilService: EstadoCivilService,
    private pacienteService: PacienteService,
    private dialog: MatDialog,
    private router: Router
    ) {}

  ngOnInit() {
    this.obraSocialService.getObraSociales().subscribe(
      data => this.correctObraSociales(data)
    )

    this.listaEstadoCiviles = this.estadoCivilService.listaEstadoCivil;

    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      direccion: [''],
      numero: [''],
      estadoCivil: [''],
      telefono: [''],
      obraSocial: [''],
      emailGroup: this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        emailConfirm: ['', [Validators.required]],
      }, { validator: CustomValidators.childrenEqual}),
      passGroup: this.formBuilder.group({
        pass: ['', [
          Validators.required
        ]],
        passConfirm: ['', [Validators.required]],
      }, { validator: CustomValidators.childrenEqual}),
    });

  }

  correctObraSociales(data: ObraSocial[]){
    this.listaObraSociales = data;
  }

  botonRegistrar(){
    
    this.usuario = {
      email: this.formGroup.value.emailGroup.email,
      password: this.formGroup.value.passGroup.pass,
      nivelPermiso: 0,
      activo: true,
      emailConfirm: false,
      pathReset: "nada",
      nombre: this.formGroup.value.nombre,
      apellido: this.formGroup.value.apellido
    }

    this.usuarioService.newUsuario(this.usuario).subscribe(
      data => this.correctUsuario(data)
    )

    this.paciente = {
      dni: this.formGroup.value.dni,
      nombre: this.formGroup.value.nombre,
      apellido: this.formGroup.value.apellido,
      direccion: this.formGroup.value.direccion + " " + this.formGroup.value.numero,
      telefono: this.formGroup.value.telefono,
      idObraSocial: this.formGroup.value.obraSocial,
      email: this.formGroup.value.emailGroup.email,
    }

    console.log("boton Reginstrad", this.paciente);

    this.pacienteService.new(this.paciente).subscribe(
      data => this.correctPaciente(data)
    )

    this.openDialogExito();
    
    return false;
  }

  correctUsuario(data: User) {
    if (data) {
      console.log(data);
    }
  }

  correctPaciente(data: Boolean) {
    if (data) {
      console.log(data);
    }
  }

  openDialogExito(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: "Resultado de la Creacion de Paciente",
      body: "Exitoso. Le mandamos un email al paciente para confirmar"
    };
    const unDialgo = this.dialog.open(SimpleDialogComponent,dialogConfig);

    unDialgo.afterClosed().subscribe(result => {
      this.router.navigate(['/secretaria/listar-pacientes']);
    });
  }
}