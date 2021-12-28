import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthModel } from 'src/app/models/auth.model';
import { catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  postlogin(datosLogin: AuthModel): Observable<string> {
    return this.http.post<string>(
      `${this.baseUrl}/auth/v1/document/`, datosLogin
    )
    .pipe(
      catchError(err => {
        console.log(err);
        return of("");
      })
    );
  }
}
