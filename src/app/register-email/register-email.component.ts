import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SimpleDialogComponent } from '../dialog/simple-dialog/simple-dialog.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/shared/authentication.service';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.css']
})
export class RegisterEmailComponent implements OnInit {
  private UUID: String;

  constructor(
    private rutaActiva: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    console.log(this.rutaActiva.snapshot.params.enlace);
    this.UUID = this.rutaActiva.snapshot.params.enlace;
    this.activarEmail();
  }

  activarEmail(){
    this.authenticationService.validarEmail(this.UUID).subscribe(
      data => this.openDialog(),
      error => this.checkError(error)
    )
  }

  checkError(error: any){
    console.log(error);
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { 
      title: "Cuenta Activada",
      body: "Tu cuenta fué activada con éxito"
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
