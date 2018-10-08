import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPassComponent } from './register-pass.component';

describe('RegisterPassComponent', () => {
  let component: RegisterPassComponent;
  let fixture: ComponentFixture<RegisterPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
