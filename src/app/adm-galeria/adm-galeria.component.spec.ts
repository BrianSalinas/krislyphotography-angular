import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmGaleriaComponent } from './adm-galeria.component';

describe('AdmGaleriaComponent', () => {
  let component: AdmGaleriaComponent;
  let fixture: ComponentFixture<AdmGaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmGaleriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
