import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/shared/authentication.service';
import { ConfirmValidParentMatcher, CustomValidators } from '../core/errors/custom-validators';
import { ActivatedRoute, Params } from '@angular/router';
import { ResetPass } from '../core/models/reset-pass.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SimpleDialogComponent } from '../dialog/simple-dialog/simple-dialog.component';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  public uuid: String;
  public resetPassForm: FormGroup;
  public submitted: boolean = false;
  public error: {code: number, message: string} = null;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog,
    private rutaActiva: ActivatedRoute
  ) { }

  ngOnInit() {
    this.uuid = this.rutaActiva.snapshot.params.enlace;

    this.resetPassForm = this.formBuilder.group({
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    }, {validator: CustomValidators.childrenEqual })
  }

  submitResetPass():void {
    this.submitted = true;
    this.error = null;
    let resetPass: ResetPass = {uuid: this.uuid,password: this.resetPassForm.value.password };
    if (this.resetPassForm.valid) {
      console.log(resetPass);
      this.authenticationService.resetPass(resetPass).subscribe(
        data => this.checkRespuesta(data)
      )
    }
  }

  checkRespuesta(resultado: Boolean){
    if (resultado == true) {
      this.openDialog();
    }
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: "Resultado de Password",
      body: "Cambio de contraseña exitoso, puede ingresar al sistema"
    };
    const unDialgo = this.dialog.open(SimpleDialogComponent,dialogConfig);

    unDialgo.afterClosed().subscribe(result => {
      this.router.navigate(['/login']);
    });
  }

}
