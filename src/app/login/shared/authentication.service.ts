import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginObject } from './login-object.model';
import { Session } from '../../core/models/session.model';
import { ConfigService } from '../../core/shared/config.service';
import { User } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  login(loginObj: LoginObject): Observable<Session> {
    return this.http.post<Session>(this.config.pathServices + 'login', loginObj);
  }

  logout(): Observable<boolean> {
    return Observable.create(function(observer){
      observer.next(true);
    });
  }

  newUser(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>(this.config.pathServices + 'usuario/new', user);
  }

  validarEmail(uuid: String): Observable<Boolean> {
    return this.http.put<Boolean>(this.config.pathServices + 'usuario/validar-email', uuid);
  }
}