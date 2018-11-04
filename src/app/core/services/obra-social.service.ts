import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';
import { ObraSocial } from '../models/obra-social.model';

@Injectable({
  providedIn: 'root'
})
export class ObraSocialService {
  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {}

  public getObraSociales(): Observable<ObraSocial[]> {
    return this.http.get<ObraSocial[]>(this.config.pathServices + 'obra-social/get-all');
  }

  public getObraSocialesByDenomicacion(denominacion: String): Observable<ObraSocial[]> {
    return this.http.get<ObraSocial[]>(this.config.pathServices + 'obra-social/get-all-by-denominacion/' + denominacion);
  }

  public desactivar(idObraSocial: number): Observable<Boolean> {
    return this.http.put<Boolean>(this.config.pathServices + 'obra-social/desactivar/' + idObraSocial, null);
  }

  public activar(idObraSocial: number): Observable<Boolean> {
    return this.http.put<Boolean>(this.config.pathServices + 'obra-social/activar/' + idObraSocial, null);
  }
}