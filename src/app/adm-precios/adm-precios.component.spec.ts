import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmPreciosComponent } from './adm-precios.component';

describe('AdmPreciosComponent', () => {
  let component: AdmPreciosComponent;
  let fixture: ComponentFixture<AdmPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmPreciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
