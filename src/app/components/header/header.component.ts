import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // // Obtiene la ruta activa cuando el componente carga
    // this.currentRoute = this.router.url;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url.replace('/', '').toUpperCase(); // Elimina el "/" inicial
        
      });
  }
}