
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeMedicoComponent } from './home-medico.component';

describe('HomeMedicoComponent', () => {
  let component: HomeMedicoComponent;
  let fixture: ComponentFixture<HomeMedicoComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [HomeMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
