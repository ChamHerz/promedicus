import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public pathServices: string = 'http://localhost:8080/promedicusdb/';

  constructor() { }
}
