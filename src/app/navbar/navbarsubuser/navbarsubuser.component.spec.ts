import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarsubuserComponent } from './navbarsubuser.component';

describe('NavbarsubuserComponent', () => {
  let component: NavbarsubuserComponent;
  let fixture: ComponentFixture<NavbarsubuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarsubuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarsubuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
