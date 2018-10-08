import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../login/shared/authentication.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SimpleDialogComponent } from '../dialog/simple-dialog/simple-dialog.component';

@Component({
  selector: 'app-register-pass',
  templateUrl: './register-pass.component.html',
  styleUrls: ['./register-pass.component.css']
})
export class RegisterPassComponent implements OnInit {

  public emailForm: FormGroup;
  public submitted: boolean = false;
  public error: {code: number, message: string} = null;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  public submitEmail(): void {
    this.submitted = true;
    this.error = null;
    if (this.emailForm.valid) {
      this.authenticationService.existeEmail(this.emailForm.value.email).subscribe(
        data => this.checkRespuesta(data)
      )
    }
  }

  checkRespuesta(respuesta: Boolean){
    if (respuesta == false) {
      this.error = {code: 1, message: "Email no existente"}
    }
    if (respuesta == true) {
      this.openDialog();
    }
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: "Resetear password",
      body: "Le mandamos un email, con un enlace para resetear su password"
    };
    const unDialgo = this.dialog.open(SimpleDialogComponent,dialogConfig);

    unDialgo.afterClosed().subscribe(result => {
      this.router.navigate(['/login']);
    });
  }
}
