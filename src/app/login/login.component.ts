import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/shared/authentication.service';
import { StorageService } from '../core/services/storage.service';
import { LoginObject } from './shared/login-object.model';
import { Session } from '../core/models/session.model';

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
        error => this.error = JSON.parse(error._body)
      )
    }
  }

  private correctLogin(data: Session) {
    this.storageService.setCurrentSession(data);
    this.router.navigate(['/home']);
  }
}
