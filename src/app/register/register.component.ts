import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmValidParentMatcher, CustomValidators } from '../core/errors/custom-validators';
import { AuthenticationService } from '../login/shared/authentication.service';
import { User } from '../core/models/user.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SimpleDialogComponent } from '../dialog/simple-dialog/simple-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: ['',[ Validators.required]],
      apellido: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      emailGroup: this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        emailConfirm: ['', Validators.required]
      }, { validator: CustomValidators.childrenEqual}),
      passwordGroup: this.formBuilder.group({
        password: ['', 
          Validators.required
        ],
        passwordConfirm: ['',Validators.required]
      }, { validator: CustomValidators.childrenEqual})
    });
  }

  submitRegister():void {
    if (this.form.valid) {
      this.authenticationService.newUser(new User(this.form.value)).subscribe(
        data => this.correctRegister(),
        error => console.log(error)
      )
    }
  }

  correctRegister(){
    this.openDialog();
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: "Resultado de Registro",
      body: "Le mandamos un email, verifique su cuenta."
    };
    const unDialgo = this.dialog.open(SimpleDialogComponent,dialogConfig);

    unDialgo.afterClosed().subscribe(result => {
      this.goToLogin()
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}