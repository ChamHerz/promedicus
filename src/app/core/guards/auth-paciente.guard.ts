import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPacienteGuard implements CanActivate {

  constructor( private storageService: StorageService, private router: Router ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.storageService.isAuthenticated()) {
        if (this.storageService.isPaciente()) {
          return true;
        }
      }

    this.router.navigate(['/login']);
    return false;
  }
}
