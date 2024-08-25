import { TestBed } from '@angular/core/testing';

import { KitLivroService } from './kit-livro.service';

describe('KitLivroService', () => {
  let service: KitLivroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitLivroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
