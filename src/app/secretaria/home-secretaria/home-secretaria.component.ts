import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../core/models/user.model';
import { Secretaria } from '../../core/models/secretaria.model';
import { SecretariaService } from '../secretaria.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-secretaria/home-secretaria',
  templateUrl: './home-secretaria.component.html',
  styleUrls: ['./home-secretaria.component.css']
})
export class HomeSecretariaComponent {

  user: User;
  secretaria: Secretaria = new Secretaria();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(
    private breakpointObserver: BreakpointObserver,
    private secretariaService: SecretariaService
    ) {}

    ngOnInit() {
      console.log(this.secretaria);
      let token: String = this.secretariaService.getCurrentToken();
      this.secretariaService.getSecretaria(token).subscribe(
        data => this.correctSecretaria(data)
      )
    }

    correctSecretaria(data: Secretaria) {
      this.secretaria = data;
    }

  public logout(): void{
    this.secretariaService.logout();
  }
  
  }
