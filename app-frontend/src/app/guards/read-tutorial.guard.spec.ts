import { TestBed } from '@angular/core/testing';

import { ReadTutorialGuard } from './read-tutorial.guard';

describe('ReadTutorialGuard', () => {
  let guard: ReadTutorialGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReadTutorialGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
