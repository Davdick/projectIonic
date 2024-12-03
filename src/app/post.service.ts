import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private apiSign = 'https://backendportafolio-a3czbee8aah8aybc.mexicocentral-01.azurewebsites.net/api/sign/signup';
  private certifications = "https://backendportafolio-a3czbee8aah8aybc.mexicocentral-01.azurewebsites.net/api/sign/certifications"
  private apiPrueba = 'https://jsonplaceholder.typicode.com/todos/1';
  private pushAPI = 'https://backendportafolio-a3czbee8aah8aybc.mexicocentral-01.azurewebsites.net/api/sign/sign/xd';

  constructor(private http: HttpClient) { }

  
  // Método para realizar el POST, ahora acepta un parámetro
  createPost(postData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8'
    });

    // Convertir el objeto a JSON
    return this.http.post(this.apiUrl, JSON.stringify(postData), { headers, observe: 'response' });
  }

  getData(): Observable<any> {
    return this.http.get<any>(this.certifications);
  }

  getJSONPlaceHolder(): Observable<any> {
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });
  
    // Realizar la solicitud GET con parámetros de consulta
    return this.http.get<any>(this.apiPrueba, { headers, observe: 'response' });
  }

  getNotisPush(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });
  
    // Realizar la solicitud GET con parámetros de consulta
    return this.http.get<any>(this.pushAPI, { headers, observe: 'response' });
  }

  
  
}
