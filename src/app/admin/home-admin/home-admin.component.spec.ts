
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeAdminComponent } from './home-admin.component';

describe('HomeAdminComponent', () => {
  let component: HomeAdminComponent;
  let fixture: ComponentFixture<HomeAdminComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [HomeAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
