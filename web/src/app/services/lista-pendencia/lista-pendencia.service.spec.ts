import { TestBed } from '@angular/core/testing';

import { ListaPendenciaService } from './lista-pendencia.service';

describe('ListaPendenciaService', () => {
  let service: ListaPendenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaPendenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
