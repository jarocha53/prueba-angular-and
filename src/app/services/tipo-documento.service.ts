import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TipoDocumentoModel } from 'src/app/models/tipo-documento.model';
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TipoDocumentoService {

  private urlBase = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTiposDocumento(): Observable<Array<TipoDocumentoModel>> {
    return this.http.get<Array<TipoDocumentoModel>>(
      `${this.urlBase}/auth/v1/document/`
    )
    .pipe(
      catchError(err => {
        console.log(err);
        return of([]);
      })
    );
  }
}
