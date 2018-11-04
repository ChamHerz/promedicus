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
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente/datos-paciente',
  templateUrl: './datos-paciente.component.html',
  styleUrls: ['./datos-paciente.component.css']
})
export class DatosPacienteComponent {
  

  grid= {
    nombre: {col: 3, row: 1},
    apellido: {col: 3, row: 1},
    dni: {col: 1, row: 1},
    espacioDos: {col: 2, row: 1},
    direccion: {col: 3, row: 1},
    estadoCivil: {col: 1, row: 1},
    telefono: {col: 2, row: 1},
    obraSocial: {col: 2, row: 1},
    email: {col:3, row: 1},
    emailConfirm: {col:3, row: 1},
    pass: {col:3, row: 1},
    passConfirm: {col:3, row: 1},
    espacioFinal: {col: 4, row: 1},
    botonCambiarPass: {col: 1, row: 1},
    botonSacarTurno: {col:1, row: 1}
  }

  public formGroup: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  public usuario: User;
  public paciente: Paciente;
  public listaObraSociales: ObraSocial[];
  public listaEstadoCiviles: EstadoCivil[];
  public token: String;

  layoutChanges = this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
    if(result.matches){
      //celular
      this.grid = {
        nombre: {col: 6, row: 1},
        apellido: {col: 6, row: 1},
        dni: {col: 6, row: 1},
        espacioDos: {col: 6, row: 1},
        direccion: {col: 6, row: 1},
        estadoCivil: {col: 6, row: 1},
        telefono: {col: 6, row: 1},
        obraSocial: {col: 6, row: 1},
        email: {col:6, row: 1},
        emailConfirm: {col:6, row: 1},
        pass: {col:6, row: 1},
        passConfirm: {col:6, row: 1},
        espacioFinal: {col: 6, row: 1},
        botonCambiarPass: {col: 1, row: 1},
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
      direccion: {col: 3, row: 1},
      estadoCivil: {col: 1, row: 1},
      telefono: {col: 2, row: 1},
      obraSocial: {col: 2, row: 1},
      email: {col:3, row: 1},
      emailConfirm: {col:3, row: 1},
      pass: {col:3, row: 1},
      passConfirm: {col:3, row: 1},
      espacioFinal: {col: 4, row: 1},
      botonCambiarPass: {col: 1, row: 1},
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
    private activeRoute: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {
    if (this.activeRoute.snapshot.params.email) {
      this.token = this.activeRoute.snapshot.params.email;
    }
    else {
      this.token = this.pacienteService.getCurrentToken();
    }

    console.log("antes del user", this.token);
    this.usuarioService.get(this.token).subscribe(
      data => this.correctCargaUser(data)
    )

    this.pacienteService.get(this.token).subscribe(
      data => this.correctCargaPaciente(data)
    )

    this.obraSocialService.getObraSociales().subscribe(
      data => this.correctObraSociales(data)
    )

    this.listaEstadoCiviles = this.estadoCivilService.listaEstadoCivil;

    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      direccion: [''],
      estadoCivil: [''],
      telefono: [''],
      idObraSocial: [''],
      emailGroup: this.formBuilder.group({
        email: [''],
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

  correctCargaUser(data: User) {
    this.usuario = data;
  }

  correctCargaPaciente(data: Paciente) {
    this.paciente = data;
    this.formGroup.setValue({
      "nombre": this.paciente.nombre,
      "apellido": this.paciente.apellido,
      "dni": this.paciente.dni,
      "direccion": this.paciente.direccion,
      "estadoCivil": this.paciente.estadoCivil,
      "telefono": this.paciente.telefono,
      "idObraSocial": this.paciente.idObraSocial,
      "emailGroup": {
        "email": this.paciente.email,
        "emailConfirm": this.paciente.email
      },
      "passGroup": {
        "pass": "***************",
        "passConfirm": "***************",
      }
    });
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