import { Component } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ConfirmValidParentMatcher, CustomValidators } from '../../core/errors/custom-validators';
import { User } from '../../core/models/user.model';
import { Medico } from '../../core/models/medico.model';
import { Secretaria } from '../../core/models/secretaria.model';
import { MedicoObraSocial } from '../../core/models/medico-obra-social';
import { MedicoSecretaria } from '../../core/models/medico-secretaria';
import { UsuarioService } from '../../core/services/usuario.service';
import { MedicoService } from '../../medico/medico.service';
import { MedicoSecretariaService } from '../../core/services/medico-secretaria.service';
import { SecretariaService } from '../../secretaria/secretaria.service';
import { ObraSocial } from '../../core/models/obra-social.model';
import { ObraSocialService } from '../../core/services/obra-social.service';
import { EspecilidadService } from '../../core/services/especilidad.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SimpleDialogComponent } from '../../dialog/simple-dialog/simple-dialog.component';
import { Router } from '@angular/router';
import { Especialidad } from '../../core/models/especialidad.model';
import { MedicoObraSocialService } from '../../core/services/medico-obra-social.service';
import { v4 as uuid } from 'uuid';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-secretaria/medico-mirar',
  templateUrl: './medico-mirar.component.html',
  styleUrls: ['./medico-mirar.component.css']
})
export class MedicoMirarComponent {
  grid= {
    nombre: {col: 3, row: 1},
    apellido: {col: 3, row: 1},
    dni: {col: 1, row: 1},
    espacioDos: {col: 2, row: 1},
    direccion: {col: 2, row: 1},
    nroLegajo: {col: 1, row: 1},
    especialidad: {col: 1, row: 1},
    secretarias: {col: 2, row: 1},
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
  public medico: Medico;
  public listaObraSociales: ObraSocial[];
  public listaSecretarias: Secretaria[];
  public listaEspecialidades: Especialidad[];
  public secretarias = new Array<number>();
  public obraSociales = new Array<number>();
  //public listaMedicoObraSocial = new Array<MedicoObraSocial>();
  
  public nrolegajo: String;

  layoutChanges = this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
    if(result.matches){
      //celular
      this.grid = {
        nombre: {col: 6, row: 1},
        apellido: {col: 6, row: 1},
        dni: {col: 6, row: 1},
        espacioDos: {col: 6, row: 1},
        direccion: {col: 6, row: 1},
        nroLegajo: {col: 6, row: 1},
        especialidad: {col: 6, row: 1},
        secretarias: {col: 2, row: 1},
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
      nroLegajo: {col: 1, row: 1},
      especialidad: {col: 1, row: 1},
      secretarias: {col: 2, row: 1},
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
    private medicoService: MedicoService,
    private secretariaService: SecretariaService,
    private medicoObraSocialService: MedicoObraSocialService,
    private medicoSecretariaService: MedicoSecretariaService,
    private especialidadService: EspecilidadService,
    private dialog: MatDialog,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) {}

  ngOnInit() {
    if (this.activeRoute.snapshot.params.nrolegajo) {
      this.nrolegajo = this.activeRoute.snapshot.params.nrolegajo;
    }
    else {
      this.nrolegajo = this.medicoService.getCurrentToken();
    }

    this.medicoService.getMedicoByNroLegajo(this.nrolegajo).subscribe(
      data => this.correctCargaMedico(data)
    )

    this.obraSocialService.getObraSociales().subscribe(
      data => this.correctObraSociales(data)
    )

    this.especialidadService.getEspecialidades().subscribe(
      data => this.correctEspecialidades(data)
    )

    this.secretariaService.getAllNames().subscribe(
      data => this.correctSecretarias(data)
    )

    this.formGroup = this.formBuilder.group({
      nombre: new FormControl({value: "", disabled: true}, Validators.required),
      apellido: new FormControl({value: "", disabled: true}, Validators.required),
      dni: new FormControl({value: 1, disabled: true}, Validators.required),
      direccion: new FormControl({value: "", disabled: true}, Validators.required),
      nroLegajo: new FormControl({value: 1, disabled: true}, Validators.required),
      especialidad: new FormControl({value: "", disabled: true}, Validators.required),
      telefono: new FormControl({value: "", disabled: true}, Validators.required),
      secretarias: new FormControl({value: "", disabled: true}, Validators.required),
      obraSocial: [''],
      emailGroup: this.formBuilder.group({
        email: new FormControl({value: "", disabled: true}, Validators.required),
        emailConfirm: new FormControl({value: "", disabled: true}, Validators.required)
      }),
      passGroup: this.formBuilder.group({
        pass: new FormControl({value: 1, disabled: true}, Validators.required),
        passConfirm: new FormControl({value: 1, disabled: true}, Validators.required),
      }),
    });

  }

  correctCargaUsuario(data: User) {
    this.usuario = data;
    this.formGroup.patchValue({
      "nombre":this.usuario.nombre,
      "apellido":this.usuario.apellido,
      "emailGroup": {
        "email": this.usuario.email,
        "emailConfirm": this.usuario.email
      },
      "passGroup": {
        "pass": "***************",
        "passConfirm": "***************",
      }
    })
  }

  correctCargaMedico(data: Medico) {
    this.medico = data;

    this.usuarioService.get(this.medico.email).subscribe(
      data => this.correctCargaUsuario(data)
    )

    console.log("medico",this.medico);

    this.formGroup.patchValue({
      "dni": this.medico.dni,
      "telefono": this.medico.telefono,
      "direccion": this.medico.direccion,
      "nroLegajo": this.medico.nroLegajo,
      "especialidad": this.medico.especialidad
    })

    this.medicoObraSocialService.get(this.medico.nroLegajo).subscribe(
      data => this.correctCargaMedicoObraSociales(data)
    )

    this.medicoSecretariaService.getByMedico(this.medico.nroLegajo).subscribe(
      data => this.correctCargaMedicoSecretaria(data)
    )
  }

  correctCargaMedicoObraSociales(obraSocialesObtenidas: MedicoObraSocial[]){
    this.obraSociales = [];
    obraSocialesObtenidas.forEach(
      unaObraSocial => this.obraSociales.push(unaObraSocial.idObraSocial)
    );
    
    this.formGroup.patchValue({
      "obraSocial": this.obraSociales
    })
  }

  correctCargaMedicoSecretaria(secretariasObtenidas: MedicoSecretaria[]) {
    this.secretarias = [];

    secretariasObtenidas.forEach(
      unaSecretaria => this.secretarias.push(unaSecretaria.nroLegajoSecretaria)
    );

    this.formGroup.patchValue({
      "secretarias": this.secretarias
    })

  }

  correctSecretarias(data: Secretaria[]) {
    this.listaSecretarias = data;
  }

  correctObraSociales(data: ObraSocial[]){
    this.listaObraSociales = data;
  }

  botonModificar(){

    // let medicoSecretariasEnviar = new Array<MedicoSecretaria>();
    // this.formGroup.value.secretarias.forEach(
    //   unNroLegajo => medicoSecretariasEnviar.push({
    //     nroLegajoMedico: this.medico.nroLegajo,
    //     nroLegajoSecretaria: unNroLegajo
    //   })
    // )

    // this.medicoSecretariaService.setByMedico(
    //   this.medico.nroLegajo,
    //   medicoSecretariasEnviar).subscribe(
    //   data => this.correctSaveMedicoSecretaria(data)
    // );

    let medicoObraSocialEnviar = new Array<MedicoObraSocial>();
    this.formGroup.value.obraSocial.forEach(
      unIdObraSocial => medicoObraSocialEnviar.push({
        nroLegajo: this.medico.nroLegajo,
        idObraSocial: unIdObraSocial
      })
    )

    this.medicoObraSocialService.setByMedico(this.medico.nroLegajo,medicoObraSocialEnviar).subscribe(
      data => this.correctSaveMedicoObraSocial(data)
    )

    // this.medico.nombre = this.formGroup.value.nombre;
    // this.medico.apellido = this.formGroup.value.apellido;
    // this.medico.dni = this.formGroup.value.dni;
    // this.medico.telefono = this.formGroup.value.telefono;
    // this.medico.direccion = this.formGroup.value.direccion;
    // this.medico.especialidad = this.formGroup.value.especialidad;

    // console.log(this.medico);
    // this.medicoService.updateFromAdmin(this.medico).subscribe(
    //   data => this.correctSavePaciente(data)
    // )

    this.openDialogExito();

    return false;
  }

  correctSavePaciente(data: Boolean) {

  }

  correctSaveMedicoObraSocial(data: Boolean) {

  }

  correctSaveMedicoSecretaria(data: Boolean) {

  }

  correctMedicoObraSociales(data: Boolean){
  
  }

  correctUsuario(data: User) {
   
  }

  correctPaciente(data: Boolean) {
    
  }

  correctEspecialidades(data: Especialidad[]){
    this.listaEspecialidades = data;
  }

  openDialogExito(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: "Resultado de la Modificacion del Medico",
      body: "Modificacion Existosa"
    };
    const unDialgo = this.dialog.open(SimpleDialogComponent,dialogConfig);

    unDialgo.afterClosed().subscribe(result => {
      
    });
  }
}