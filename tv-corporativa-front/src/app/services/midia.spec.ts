import { TestBed } from '@angular/core/testing';

import { Midia } from './midia';

describe('Midia', () => {
  let service: Midia;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Midia);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
