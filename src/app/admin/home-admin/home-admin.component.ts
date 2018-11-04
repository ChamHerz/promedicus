import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../core/models/user.model';
import { Admin } from '../../core/models/admin.model';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin/home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {

  user: User;
  admin: Admin = new Admin();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(
    private breakpointObserver: BreakpointObserver,
    private adminService: AdminService
    ) {}

    ngOnInit() {
      
      let token: String = this.adminService.getCurrentToken();
      this.adminService.getAdmin(token).subscribe(
        data => this.correctAdmin(data)
      )
    }

    correctAdmin(data: Admin) {
      this.admin = data;
      console.log(this.admin);
    }

  public logout(): void{
    this.adminService.logout();
  }
  
  }