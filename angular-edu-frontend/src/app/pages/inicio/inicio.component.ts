import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  data: any;
  loading: boolean = true;
  error: boolean = false;
  readonly highlights = [
    {
      title: 'Arquitectura moderna',
      copy: 'Componentes desacoplados y servicios reutilizables para escalar sin dolores.'
    },
    {
      title: 'Experiencias inmersivas',
      copy: 'Interacciones fluidas con animaciones sutiles y accesibilidad integrada.'
    },
    {
      title: 'Stack completo',
      copy: 'Frontend Angular + backend Node.js comunicándose vía API REST.'
    }
  ];

  readonly objectives = [
    {
      title: 'Objetivos',
      description: 'Construir una plataforma educativa que conecte contenidos y métricas en tiempo real.'
    },
    {
      title: 'Misión',
      description: 'Acercar buenas prácticas de desarrollo a equipos académicos multidisciplinarios.'
    },
    {
      title: 'Visión',
      description: 'Ser la referencia regional en experiencias educativas digitales.'
    }
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getInfo().subscribe({
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

