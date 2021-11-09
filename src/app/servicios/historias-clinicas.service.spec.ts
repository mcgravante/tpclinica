import { TestBed } from '@angular/core/testing';

import { HistoriasClinicasService } from './historias-clinicas.service';

describe('HistoriasClinicasService', () => {
  let service: HistoriasClinicasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriasClinicasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
