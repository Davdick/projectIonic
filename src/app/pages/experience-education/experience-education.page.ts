import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-experience-education',
  templateUrl: './experience-education.page.html',
  styleUrls: ['./experience-education.page.scss'],
})
export class ExperienceEducationPage implements OnInit {

  

public visibleData: any[] = [];    // Almacena los datos visibles en pantalla
data: any[] = [];
loadCount: number = 0;

  
  constructor(private postService: PostService) { 
    this.getDataFromApi();
  }

  ngOnInit() {
  }
  loadData(event: any){
      console.log(event);
      this.loadCount += 2;
      this.getVisibleDatas();
  }

  getDataFromApi() {
    this.postService.getData().subscribe(
      (response) => {
        
        this.data = response; // Almacena los datos recibidos
        console.log(this.data);
        this.loadCount = 8;
        this.getVisibleDatas();
        
      },
      (error) => {
        console.error('Error al obtener los datos: ', error);
      }
    );
    

  }
  getVisibleDatas(){
    this.visibleData = this.data.slice(0, this.loadCount);
  }

  openLink(url: string) {
    window.open(url, '_blank'); // Abre el enlace en una nueva pestaña
  }

}
