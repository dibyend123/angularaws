import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminusercreationComponent } from './adminusercreation.component';

describe('AdminusercreationComponent', () => {
  let component: AdminusercreationComponent;
  let fixture: ComponentFixture<AdminusercreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminusercreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminusercreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
