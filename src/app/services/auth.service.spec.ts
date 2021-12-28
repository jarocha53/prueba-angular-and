import { AuthService } from './auth.service';
import { HttpClient } from "@angular/common/http";

describe('Auth.Service', () => {
  it('should create an instance', () => {
    let http: HttpClient
    expect(new AuthService()).toBeTruthy();
  });
});
