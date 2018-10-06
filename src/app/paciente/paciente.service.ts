import { Injectable } from '@angular/core';
import { User } from '../core/models/user.model';
import { StorageService } from '../core/services/storage.service';
import { AuthenticationService } from '../login/shared/authentication.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../core/shared/config.service';
import { Token } from '../core/models/token.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private user: User;

  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public getCurrentUser(): Observable<User> {
    let token: Token = {token: this.getCurrentToken()};
    return this.http.post<User>(this.config.pathServices + 'usuario/get-one', token);
  }

  public getCurrentToken(): String {
    return this.storageService.getCurrentToken();
  }

  public logout(): void{
    this.authenticationService.logout().subscribe(
        response => {if(response) {this.storageService.logout();}}
    );
  }

}
