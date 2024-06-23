import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { resolveResolver } from './resolve.resolver';

describe('resolveResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => resolveResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
