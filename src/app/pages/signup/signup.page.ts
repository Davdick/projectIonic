import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  username: string = '';
  password: string = '';
  agreed: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    console.log(this.agreed);
    if(this.agreed){
      this.authService.signup(this.username, this.password).subscribe(
        (response: HttpResponse<any>) => {
          // Si el código de respuesta es 200, redirige al usuario
          if (response.status === 200) {
            this.router.navigate(['/login']);
          }
        },
        (error: HttpErrorResponse) => {
          // Si el código de error es 400, muestra el mensaje de advertencia
          if (error.status === 400) {
            alert('Prueba con utilizar mayúsculas, minúsculas, números y carácteres especiales');
          } else {
            console.error('Error inesperado:', error);
          }
        }
      );
    }else{
      alert("You didn't accept terms and conditions")
    }
    
  }
  setCheck(){
    this.agreed = true;
  }

}
