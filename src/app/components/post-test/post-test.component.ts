import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';


@Component({
  selector: 'app-post-test',
  templateUrl: './post-test.component.html',
  styleUrls: ['./post-test.component.scss'],
})
export class PostTestComponent{

   // Objeto para almacenar los datos del formulario
   postData = {
    title: '',
    body: '',
    userId: 1 // Puedes dejar esto fijo o permitir que el usuario lo modifique
  };

  constructor(private postService: PostService) {}

  ngOnInit() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('custom-service-worker.js');
    }
  }

  // Método para enviar el formulario
  onSubmit(): void {
    this.postService.createPost(this.postData).subscribe(
      response => {
        console.log('Post creado:', response); // Muestra la respuesta en la consola
      },
      error => {
        console.error('Error realizando el POST', error);
      }
    );
  }
  //Metodo para simular notificaciones
  xdN(): void{
    this.postService.getJSONPlaceHolder().subscribe(
      response => {
        console.log('Data OK', response);
      },
      error =>{
        console.error('Error', error);
      }
    );
  }

}
