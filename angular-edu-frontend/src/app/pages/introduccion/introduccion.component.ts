import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-introduccion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduccion.component.html',
  styleUrl: './introduccion.component.css'
})
export class IntroduccionComponent implements OnInit {
  data: any;
  loading: boolean = true;
  error: boolean = false;
  readonly fundamentals = [
    { title: 'Componentes', description: 'Encapsulan lógica, template y estilos para reutilizar UI.' },
    { title: 'Templates', description: 'Describen la vista con bindings declarativos y directivas.' },
    { title: 'Módulos', description: 'Organizan features y habilitan lazy loading.' },
    { title: 'Enrutamiento', description: 'Navegación cliente fluida sin recargar la página.' },
    { title: 'Servicios', description: 'Lógica de negocio compartida disponible vía inyección.' },
    { title: 'DI', description: 'Inyección de dependencias para configurar componentes de forma declarativa.' }
  ];

  readonly lifecycle = [
    'ngOnChanges',
    'ngOnInit',
    'ngDoCheck',
    'ngAfterContentInit',
    'ngAfterContentChecked',
    'ngAfterViewInit',
    'ngAfterViewChecked',
    'ngOnDestroy'
  ];

  readonly architecture = [
    { title: 'Componentes', copy: 'Definen el comportamiento y estado.' },
    { title: 'Templates', copy: 'Estructuran la UI con HTML enriquecido.' },
    { title: 'Estilos', copy: 'Encapsulan la identidad visual.' }
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getIntroduccion().subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
        this.error = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}

