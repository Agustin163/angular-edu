# AngularEduFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Despliegue en Vercel

Para desplegar este proyecto en Vercel, utiliza la siguiente configuración:

### Configuración de Vercel

- **Framework Preset:** Angular
- **Build Command:** `ng build`
- **Output Directory:** `dist/angular-edu-frontend/browser`
- **Install Command:** `npm install`

### Pasos para desplegar

1. Conecta tu repositorio de GitHub con Vercel
2. Selecciona el framework preset: **Angular**
3. Vercel detectará automáticamente la configuración, pero asegúrate de que:
   - **Root Directory:** `angular-edu-frontend` (si el proyecto está en un subdirectorio)
   - **Build Command:** `ng build`
   - **Output Directory:** `dist/angular-edu-frontend/browser`
   - **Install Command:** `npm install`
4. Haz clic en "Deploy"

### Notas importantes

- El proyecto está configurado para generar el build en `dist/angular-edu-frontend/browser` (Angular 17+ genera el build dentro de una carpeta `browser`)
- Asegúrate de que el backend esté desplegado y accesible para que las llamadas a la API funcionen correctamente
- Puedes configurar variables de entorno en Vercel si necesitas cambiar la URL del backend