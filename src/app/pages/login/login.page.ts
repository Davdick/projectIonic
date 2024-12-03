import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.signup(this.username, this.password).subscribe(
      (response: HttpResponse<any>) => {
        // Si el código de respuesta es 200, redirige al usuario
        if (response.status === 200) {
          this.authService.isAuthenticated = true;
          this.router.navigate(['/contact']);
        }
      },
      (error: HttpErrorResponse) => {
        // Si el código de error es 400, muestra el mensaje de advertencia
        if (error.status === 400) {
          alert('Credenciales inválidas');
        } else {
          console.error('Error inesperado:', error);
        }
      }
    );
  }
}