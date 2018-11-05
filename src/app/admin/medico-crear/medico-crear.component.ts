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
  selector: 'app-admin/medico-crear',
  templateUrl: './medico-crear.component.html',
  styleUrls: ['./medico-crear.component.css']
})
export class MedicoCrearComponent {
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
  public nroLegajo: number;

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
    this.medicoService.getNewNroLegajo().subscribe(
      data => this.cargarNewNroLegajo(data)
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
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      direccion: [''],
      nroLegajo: new FormControl({value: 1, disabled: true}),
      especialidad: ['',[Validators.required]],
      telefono: [''],
      secretarias: [''],
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

  cargarNewNroLegajo(nroLegajo: number) {
    this.nroLegajo = nroLegajo;
    this.formGroup.patchValue({
      "nroLegajo": nroLegajo
    })
  }

  correctSecretarias(data: Secretaria[]) {
    this.listaSecretarias = data;
  }

  correctObraSociales(data: ObraSocial[]){
    this.listaObraSociales = data;
  }

  correctEspecialidades(data: Especialidad[]){
    this.listaEspecialidades = data;
  }

  botonCrear(){
    let medicoSecretariasEnviar = new Array<MedicoSecretaria>();
    this.formGroup.value.secretarias.forEach(
      unNroLegajo => medicoSecretariasEnviar.push({
        nroLegajoMedico: this.nroLegajo,
        nroLegajoSecretaria: unNroLegajo
      })
    )

    console.log(medicoSecretariasEnviar);

    this.medicoSecretariaService.setByMedico(
      this.nroLegajo,
      medicoSecretariasEnviar).subscribe(
      data => this.correctSaveMedicoSecretaria(data)
    );

    let medicoObraSocialEnviar = new Array<MedicoObraSocial>();
    this.formGroup.value.obraSocial.forEach(
      unIdObraSocial => medicoObraSocialEnviar.push({
        nroLegajo: this.nroLegajo,
        idObraSocial: unIdObraSocial
      })
    )

    this.medicoObraSocialService.setByMedico(this.nroLegajo,medicoObraSocialEnviar).subscribe(
      data => this.correctSaveMedicoObraSocial(data)
    )

    console.log(medicoObraSocialEnviar);

    this.usuario = {
      email: this.formGroup.value.emailGroup.email,
      nivelPermiso: 2,
      activo: true,
      emailConfirm: true,
      pathReset: uuid,
      nombre: this.formGroup.value.nombre,
      apellido: this.formGroup.value.apellido,
      password: this.formGroup.value.passGroup.pass
    }

    console.log(this.usuario);

    this.usuarioService.newUsuario(this.usuario).subscribe(
      data => this.correctSaveUser(data)
    )

    this.medico = new Medico();
    this.medico.nroLegajo = this.nroLegajo;
    this.medico.nombre = this.formGroup.value.nombre;
    this.medico.apellido = this.formGroup.value.apellido;
    this.medico.dni = this.formGroup.value.dni;
    this.medico.telefono = this.formGroup.value.telefono;
    this.medico.direccion = this.formGroup.value.direccion;
    this.medico.especialidad = this.formGroup.value.especialidad;
    this.medico.email = this.formGroup.value.emailGroup.email;
    this.medico.fechaIngreso = new Date();
    
    console.log(this.medico);
    
    this.medicoService.newMedico(this.medico).subscribe(
      data => this.correctSavePaciente(data)
    )

    this.openDialogExito();

    return false;
  }

  correctSaveUser(data: User) {

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

  openDialogExito(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: "Resultado de la Modificacion del Medico",
      body: "Modificacion Existosa"
    };
    const unDialgo = this.dialog.open(SimpleDialogComponent,dialogConfig);

    unDialgo.afterClosed().subscribe(result => {
      this.router.navigate(['/admin/listar-usuarios']);
    });
  }
}