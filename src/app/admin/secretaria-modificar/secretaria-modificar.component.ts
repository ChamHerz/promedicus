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
  selector: 'app-admin/secretaria-modificar',
  templateUrl: './secretaria-modificar.component.html',
  styleUrls: ['./secretaria-modificar.component.css']
})
export class SecretariaModificarComponent {
  grid= {
    nombre: {col: 3, row: 1},
    apellido: {col: 3, row: 1},
    dni: {col: 1, row: 1},
    espacioDos: {col: 2, row: 1},
    direccion: {col: 2, row: 1},
    nroLegajo: {col: 1, row: 1},
    especialidad: {col: 1, row: 1},
    medicos: {col: 2, row: 1},
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
  public secretaria: Secretaria;
  public listaObraSociales: ObraSocial[];
  //public listaSecretarias: Secretaria[];
  public listaMedicos: Medico[];
  public listaEspecialidades: Especialidad[];
  public medicos = new Array<number>();
  public obraSociales = new Array<number>();
  //public listaMedicoObraSocial = new Array<MedicoObraSocial>();
  
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
        nroLegajo: {col: 6, row: 1},
        especialidad: {col: 6, row: 1},
        medicos: {col: 2, row: 1},
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
      medicos: {col: 2, row: 1},
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
    if (this.activeRoute.snapshot.params.email) {
      this.token = this.activeRoute.snapshot.params.email;
    }
    else {
      this.token = this.medicoService.getCurrentToken();
    }

    this.usuarioService.get(this.token).subscribe(
      data => this.correctCargaUsuario(data)
    )

    this.secretariaService.getSecretaria(this.token).subscribe(
      data => this.correctCargaSecretaria(data)
    )

    this.obraSocialService.getObraSociales().subscribe(
      data => this.correctObraSociales(data)
    )

    this.especialidadService.getEspecialidades().subscribe(
      data => this.correctEspecialidades(data)
    )

    this.medicoService.getAllNames().subscribe(
      data => this.correctMedicos(data)
    )

    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni: new FormControl({value: "", disabled: true}, Validators.required),
      direccion: [''],
      nroLegajo: new FormControl({value: 1, disabled: true}, Validators.required),
      telefono: [''],
      medicos: [''],
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

  correctCargaSecretaria(data: Secretaria) {
    this.secretaria = data;

    console.log("secretaria",this.secretaria);

    this.formGroup.patchValue({
      "dni": this.secretaria.dni,
      "telefono": this.secretaria.telefono,
      "direccion": this.secretaria.direccion,
      "nroLegajo": this.secretaria.nroLegajo
    })

    // this.medicoObraSocialService.get(this.medico.nroLegajo).subscribe(
    //   data => this.correctCargaMedicoObraSociales(data)
    // )

    this.medicoSecretariaService.getBySecretary(this.secretaria.nroLegajo).subscribe(
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

  correctCargaMedicoSecretaria(medicosObtenidos: MedicoSecretaria[]) {
    this.medicos = [];

    medicosObtenidos.forEach(
      unMedico => this.medicos.push(unMedico.nroLegajoMedico)
    );

    this.formGroup.patchValue({
      "medicos": this.medicos
    })

  }

  correctMedicos(data: Medico[]) {
    this.listaMedicos = data;
  }

  correctObraSociales(data: ObraSocial[]){
    this.listaObraSociales = data;
  }

  botonModificar(){

    let medicoSecretariasEnviar = new Array<MedicoSecretaria>();
    this.formGroup.value.medicos.forEach(
      unNroLegajo => medicoSecretariasEnviar.push({
        nroLegajoMedico: unNroLegajo,
        nroLegajoSecretaria: this.secretaria.nroLegajo
      })
    )

    this.medicoSecretariaService.setBySecretary(
      this.secretaria.nroLegajo,
      medicoSecretariasEnviar).subscribe(
      data => this.correctSaveMedicoSecretaria(data)
    );

    // let medicoObraSocialEnviar = new Array<MedicoObraSocial>();
    // this.formGroup.value.obraSocial.forEach(
    //   unIdObraSocial => medicoObraSocialEnviar.push({
    //     nroLegajo: this.medico.nroLegajo,
    //     idObraSocial: unIdObraSocial
    //   })
    // )

    // this.medicoObraSocialService.setByMedico(this.medico.nroLegajo,medicoObraSocialEnviar).subscribe(
    //   data => this.correctSaveMedicoObraSocial(data)
    // )

    this.secretaria.nombre = this.formGroup.value.nombre;
    this.secretaria.apellido = this.formGroup.value.apellido;
    //this.secretaria.dni = this.formGroup.value.dni;
    this.secretaria.telefono = this.formGroup.value.telefono;
    this.secretaria.direccion = this.formGroup.value.direccion;

    console.log(this.secretaria);
    this.secretariaService.updateFromAdmin(this.secretaria).subscribe(
      data => this.correctSavePaciente(data)
    )

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