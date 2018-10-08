import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Especialidad } from '../../core/models/especialidad.model';
import { EspecilidadService } from '../../core/services/especilidad.service';
import { Medico } from '../../core/models/medico.model';
import { MedicoService } from '../../medico/medico.service';

@Component({
  selector: 'app-paciente/turno-new',
  templateUrl: './turno-new.component.html',
  styleUrls: ['./turno-new.component.css']
})
export class TurnoNewComponent {
  minDate: Date = new Date();
  maxDate: Date = new Date();

  grid= {
    desde: {col: 1, row: 1},
    hasta: {col: 1, row: 1},
    especialidad: {col: 1, row: 1},
    medico: {col: 2, row: 1},
    botonConfirmar: {col: 1, row: 1},
    tablaTurnos: {col: 6, row: 4}
  }

  public formNewTurno: FormGroup;
  public especialidades: Especialidad[];
  public medicos: Medico[];

  layoutChanges = this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
    if(result.matches){
      //celular
      this.grid = {
        desde: {col: 6, row: 1},
        hasta: {col: 6, row: 1},
        especialidad: {col: 6, row: 1},
        medico: {col: 6, row: 1},
        botonConfirmar: {col: 6, row: 1},
        tablaTurnos: {col: 6, row: 4}
      }
      return;
    }
    //escritorio
    this.grid = {
      desde: {col: 1, row: 1},
      hasta: {col: 1, row: 1},
      especialidad: {col: 1, row: 1},
      medico: {col: 2, row: 1},
      botonConfirmar: {col: 1, row: 1},
      tablaTurnos: {col: 6, row: 4}
    }
  });

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private especialidadService: EspecilidadService,
    private medicoService: MedicoService
    ) {}

  ngOnInit() {
    this.especialidadService.getEspecialidades().subscribe(
      data => this.correctEspecialidades(data)
    )

    this.medicoService.getAllNames().subscribe(
      data => this.correctMedicos(data)
    )

    this.maxDate.setDate(this.minDate.getDate() + 1);

    this.crearRangos();

    this.formNewTurno = this.formBuilder.group({
      desde: ['',[ Validators.required]],
      hasta: ['',[ Validators.required]],
      especialidadControl: ['',[ Validators.required]],
      medicoControl: ['',[ Validators.required]]
    });
  }

  crearRangos(){
    let fechaDesde = new Date();
    let fechaHasta = new Date();
    fechaHasta.setDate(fechaDesde.getMonth() + 1);
    console.log(fechaDesde);
    console.log(fechaHasta);

    let fechaIndex: Date = new Date(fechaDesde);
    console.log(fechaIndex);
    let index = 0;
    console.log("arranca el rango");
    while (index < 10) {
      fechaIndex.setMinutes(fechaIndex.getMinutes() + 60);
      if (fechaIndex.getDay() == 1) {
        console.log(fechaIndex);
      }
      index = index + 1;
    }
  }

  correctMedicos(data: Medico[]) {
    this.medicos = data;
  }

  correctEspecialidades(data: Especialidad[]) {
    this.especialidades = data;
  }
}
