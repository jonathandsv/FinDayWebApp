import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { originResolver } from './origin.resolver';

describe('originResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => originResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
