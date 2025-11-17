import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ApiInfo {
  title: string;
  description: string;
}

export interface IntroduccionData {
  titulo: string;
  contenido: string;
  puntos: string[];
}

export interface CaracteristicasData {
  titulo: string;
  caracteristicas: string[];
}

export interface VentajasData {
  titulo: string;
  ventajas: string[];
}

export interface ComandosData {
  titulo: string;
  comandos: Array<{
    cmd: string;
    desc: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
      console.error('Error del cliente:', error.error);
    } else {
      // Error del lado del servidor
      if (error.status === 0) {
        errorMessage = 'No se puede conectar con el servidor. Verifica que el backend esté corriendo en http://localhost:3000';
      } else {
        errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
      }
      console.error(`Error del servidor:`, error);
    }
    
    return throwError(() => new Error(errorMessage));
  }

  getInfo(): Observable<ApiInfo> {
    return this.http.get<ApiInfo>(`${this.baseUrl}/info`).pipe(
      catchError(this.handleError)
    );
  }

  getIntroduccion(): Observable<IntroduccionData> {
    return this.http.get<IntroduccionData>(`${this.baseUrl}/introduccion`).pipe(
      catchError(this.handleError)
    );
  }

  getCaracteristicas(): Observable<CaracteristicasData> {
    return this.http.get<CaracteristicasData>(`${this.baseUrl}/caracteristicas`).pipe(
      catchError(this.handleError)
    );
  }

  getVentajas(): Observable<VentajasData> {
    return this.http.get<VentajasData>(`${this.baseUrl}/ventajas`).pipe(
      catchError(this.handleError)
    );
  }

  getComandos(): Observable<ComandosData> {
    return this.http.get<ComandosData>(`${this.baseUrl}/comandos`).pipe(
      catchError(this.handleError)
    );
  }
}
