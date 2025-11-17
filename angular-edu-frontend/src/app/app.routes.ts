import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/inicio/inicio.component').then(m => m.InicioComponent)
  },
  {
    path: 'introduccion',
    loadComponent: () =>
      import('./pages/introduccion/introduccion.component').then(m => m.IntroduccionComponent)
  },
  {
    path: 'caracteristicas',
    loadComponent: () =>
      import('./pages/caracteristicas/caracteristicas.component').then(m => m.CaracteristicasComponent)
  },
  {
    path: 'ventajas',
    loadComponent: () =>
      import('./pages/ventajas/ventajas.component').then(m => m.VentajasComponent)
  },
  {
    path: 'comandos',
    loadComponent: () =>
      import('./pages/comandos/comandos.component').then(m => m.ComandosComponent)
  },
  {
    path: 'instalacion',
    loadComponent: () =>
      import('./pages/instalacion/instalacion.component').then(m => m.InstalacionComponent)
  },
  {
    path: 'acerca-del-proyecto',
    loadComponent: () =>
      import('./pages/acerca-del-proyecto/acerca-del-proyecto.component').then(m => m.AcercaDelProyectoComponent)
  },
  {
    path: 'actividades',
    loadComponent: () =>
      import('./pages/actividades/actividades.page').then(m => m.ActividadesPage)
  },
  {
    path: 'actividades/verdadero-falso',
    loadComponent: () =>
      import('./pages/actividades/verdadero-falso.page').then(m => m.VerdaderoFalsoPage)
  },
  {
    path: 'actividades/multiple-choice',
    loadComponent: () =>
      import('./pages/actividades/multiple-choice.page').then(m => m.MultipleChoicePage)
  },
  { path: '**', redirectTo: '' }
];
