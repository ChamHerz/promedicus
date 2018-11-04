
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeSecretariaComponent } from './home-secretaria.component';

describe('HomeSecretariaComponent', () => {
  let component: HomeSecretariaComponent;
  let fixture: ComponentFixture<HomeSecretariaComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [HomeSecretariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
