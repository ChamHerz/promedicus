import { Injectable } from '@angular/core';
import { HistoriaClinica } from '../models/historia-clinica';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {}

  public getHistoriaClinica(dni: String): Observable<HistoriaClinica> {
    return this.http.get<HistoriaClinica>(this.config.pathServices + 'historia-clinica/get/' + dni);
  }

}