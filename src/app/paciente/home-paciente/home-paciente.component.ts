import {Component} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../core/models/user.model';
import { PacienteService } from '../paciente.service';

@Component({
  selector: 'app-home-paciente',
  templateUrl: './home-paciente.component.html',
  styleUrls: ['./home-paciente.component.css']
})
export class HomePacienteComponent {
  
  nombre: String = "hola";
  user: User = null;
  animal: String = "perro";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(
    private breakpointObserver: BreakpointObserver,
    private pacienteService: PacienteService
    ) {}

  ngOnInit() {
    this.pacienteService.getCurrentUser().subscribe(
      data => this.correctUser(data),
      error => console.log(error)
    )
  }

  correctUser(data: User){
    this.user = data;
    console.log(this.user);
    this.nombre = this.user.email;
  }

  public logout(): void{
    this.pacienteService.logout();
  }

  openDialog(): void {

  }
  
  }