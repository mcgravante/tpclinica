import { TestBed } from '@angular/core/testing';

import { EspecAuthGuard } from './espec-auth.guard';

describe('EspecAuthGuard', () => {
  let guard: EspecAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EspecAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
