import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../core/models/user.model';
import { Medico } from '../../core/models/medico.model';
import { MedicoService } from '../medico.service';

@Component({
  selector: 'app-medico/home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})
export class HomeMedicoComponent {

  user: User;
  medico: Medico = new Medico();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(
    private breakpointObserver: BreakpointObserver,
    private medicoService: MedicoService
    ) {}

  ngOnInit() {
    console.log(this.medico);
    let token: String = this.medicoService.getCurrentToken();
    this.medicoService.getMedico(token).subscribe(
      data => this.correctMedico(data)
    )
  }

  public logout(): void {
    this.medicoService.logout();
  }

  correctMedico(data: Medico) {
    this.medico = data;
  }
  
  }
