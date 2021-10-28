import { TestBed } from '@angular/core/testing';

import { DisponibilidadEspecialistaService } from './disponibilidad-especialista.service';

describe('DisponibilidadEspecialistaService', () => {
  let service: DisponibilidadEspecialistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisponibilidadEspecialistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
