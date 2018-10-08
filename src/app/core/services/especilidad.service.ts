import { Injectable } from '@angular/core';
import { Especialidad } from '../models/especialidad.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class EspecilidadService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {}

  public getEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(this.config.pathServices + 'especialidad/get-all');
  }
}
