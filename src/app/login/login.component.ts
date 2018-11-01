import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/shared/authentication.service';
import { StorageService } from '../core/services/storage.service';
import { LoginObject } from './shared/login-object.model';
import { Session } from '../core/models/session.model';
import { NivelUsuario } from '../core/models/nivel-usuario.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted: boolean = false;
  public error: {code: number, message: string} = null;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public submitLogin(): void {
    this.submitted = true;
    this.error = null;
    if (this.loginForm.valid) {
      this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe(
        data => this.correctLogin(data),
        error => this.checkError(error)
      )
    }
  }

  private correctLogin(data: Session) {
    this.storageService.setCurrentSession(data);
    console.log(data);
    let moduloDestino = this.getModuloDestino(data.nivelPermiso);
    console.log(moduloDestino);
    this.router.navigate([moduloDestino]);
  }

  private checkError(error: any) {
    if (error.status == 400)
      this.error = error.error
    else
      this.error = {code: 2, message: "servidor fuera de linea"}
  }

  private getModuloDestino(nivelPermiso: NivelUsuario): string {
    let path: string[] = ["/paciente","/secretaria","/medico","/admin"];
    return path[nivelPermiso];
  }

  public goRegister(): void{
    this.router.navigate(['/register']);
  }

  goResetPass(): void{
    this.router.navigate(['/register-pass']);
  }
}
