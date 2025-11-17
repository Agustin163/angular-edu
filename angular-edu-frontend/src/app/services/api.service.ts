import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getInfo(): Observable<ApiInfo> {
    return this.http.get<ApiInfo>(`${this.baseUrl}/info`);
  }

  getIntroduccion(): Observable<IntroduccionData> {
    return this.http.get<IntroduccionData>(`${this.baseUrl}/introduccion`);
  }

  getCaracteristicas(): Observable<CaracteristicasData> {
    return this.http.get<CaracteristicasData>(`${this.baseUrl}/caracteristicas`);
  }

  getVentajas(): Observable<VentajasData> {
    return this.http.get<VentajasData>(`${this.baseUrl}/ventajas`);
  }

  getComandos(): Observable<ComandosData> {
    return this.http.get<ComandosData>(`${this.baseUrl}/comandos`);
  }
}
