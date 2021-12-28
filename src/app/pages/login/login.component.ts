import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthModel } from 'src/app/models/auth.model';
import { TipoDocumentoModel } from 'src/app/models/tipo-documento.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  listadoTiposDocumento: Array<TipoDocumentoModel> = []

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tipoDocumentoService: TipoDocumentoService,
    private alertService: AlertService
  ) {
    this.form = this.formBuilder.group({
      tipoidentificacion: ['', Validators.required],
      numeroidentificacion: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  // Reduciendo la forma de acceder al formulario de login
  get f() {
    return this.form.controls;
  }

  login() {
    this.submitted = true;

    //Validar si el formulario de autenticación es válido, si no para la ejecución
    if (this.f.invalid) {
      return;
    }

    this.loading = true;

    let datosLogin: AuthModel = new AuthModel();
    // this.f.username.value, this.f.password.value
    this.authService
      .postlogin(datosLogin)
      .pipe(first())
      .subscribe({
        next: (data) => {
          console.log(data);
          const returnUrl = '/home';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }

  cargarListadoTiposDocumentos() {
    this.tipoDocumentoService.getTiposDocumento().subscribe((data) => {
      this.listadoTiposDocumento = data;
    });
  }

}
