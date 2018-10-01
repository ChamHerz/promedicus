import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginObject } from './login-object.model';
import { Session } from '../../core/models/session.model';
import { ConfigService } from '../../core/shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  login(loginObj: LoginObject): Observable<Session> {
    return this.http.post<Session>(this.config.pathServices + 'login', loginObj);
  }

}