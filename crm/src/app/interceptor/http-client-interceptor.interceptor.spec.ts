import { TestBed } from '@angular/core/testing';

import { HttpClientInterceptorInterceptor } from './http-client-interceptor.interceptor';

describe('HttpClientInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpClientInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpClientInterceptorInterceptor = TestBed.inject(HttpClientInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
