import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmImagenesComponent } from './adm-imagenes.component';

describe('AdmImagenesComponent', () => {
  let component: AdmImagenesComponent;
  let fixture: ComponentFixture<AdmImagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmImagenesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
