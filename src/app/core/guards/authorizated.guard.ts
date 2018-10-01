import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@Angular/Router';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthorizatedGuard implements CanActivate {

    constructor( private router: Router, private storageService: StorageService) { }

    canActivate() {
        console.log(this.storageService.isAuthenticated());
        if (this.storageService.isAuthenticated()) {
            return true;
        }
          
        this.router.navigate(['/login']);
        return false;
    }
}