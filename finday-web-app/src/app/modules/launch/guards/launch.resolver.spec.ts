import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { launchResolver } from './launch.resolver';

describe('launchResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => launchResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
