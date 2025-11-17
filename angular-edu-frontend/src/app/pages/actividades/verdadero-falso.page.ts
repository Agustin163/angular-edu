import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PreguntaVF {
  pregunta: string;
  respuesta: boolean;
  explicacion: string;
}

interface RevisionVF {
  pregunta: string;
  correcta: boolean;
  tuRespuesta: boolean;
  respuestaCorrecta: boolean;
  explicacion: string;
}

@Component({
  standalone: true,
  selector: 'app-vf',
  imports: [CommonModule, RouterModule],
  templateUrl: './verdadero-falso.page.html',
  styleUrls: ['./verdadero-falso.page.css']
})
export class VerdaderoFalsoPage implements OnInit, OnDestroy {

  index = 0;
  puntaje = 0;
  terminado = false;
  tiempo = 0;
  review: RevisionVF[] = [];
  preguntas: PreguntaVF[] = [];

  private readonly preguntasPorPartida = 5;
  private intervalId: any = null;
  private preguntasPool: PreguntaVF[] = [
    {
      pregunta: "Angular utiliza TypeScript como lenguaje principal.",
      respuesta: true,
      explicacion: "Angular se desarrolla y mantiene sobre TypeScript como lenguaje oficial."
    },
    {
      pregunta: "Los servicios en Angular NO se utilizan para comunicación con APIs.",
      respuesta: false,
      explicacion: "Los servicios encapsulan lógica, incluida la comunicación con APIs usando HttpClient."
    },
    {
      pregunta: "El comando `ng serve` inicia el servidor de desarrollo.",
      respuesta: true,
      explicacion: "`ng serve` compila el proyecto y levanta el servidor de desarrollo en localhost."
    },
    {
      pregunta: "Los componentes en Angular pueden existir sin un template HTML.",
      respuesta: false,
      explicacion: "Todo componente Angular necesita un template (inline o archivo) para renderizar su vista."
    },
    {
      pregunta: "`HttpClient` es el módulo usado para hacer peticiones HTTP.",
      respuesta: true,
      explicacion: "`HttpClient` del paquete @angular/common/http gestiona peticiones HTTP."
    },
    {
      pregunta: "Angular CLI puede generar servicios con `ng generate service`.",
      respuesta: true,
      explicacion: "El comando `ng generate service nombre` crea un servicio listo para inyectar."
    },
    {
      pregunta: "Las directivas *ngIf y *ngFor provienen de HttpClientModule.",
      respuesta: false,
      explicacion: "Ambas directivas están declaradas en CommonModule, no en HttpClientModule."
    },
    {
      pregunta: "El decorador @Input permite recibir datos desde el componente padre.",
      respuesta: true,
      explicacion: "@Input marca propiedades que el padre puede enlazar con property binding."
    },
    {
      pregunta: "Angular sólo funciona con backends construidos en Node.js.",
      respuesta: false,
      explicacion: "Angular consume APIs REST sin importar la tecnología del backend."
    },
    {
      pregunta: "RxJS se utiliza para manejar flujos asincrónicos en Angular.",
      respuesta: true,
      explicacion: "Angular aprovecha Observables de RxJS para HTTP, eventos y reactive forms."
    }
  ];

  ngOnInit(): void {
    this.iniciarJuego();
  }

  ngOnDestroy(): void {
    this.detenerTimer();
  }

  responder(valor: boolean): void {
    if (this.terminado || !this.preguntas[this.index]) {
      return;
    }

    const preguntaActual = this.preguntas[this.index];
    const esCorrecta = valor === preguntaActual.respuesta;

    if (esCorrecta) {
      this.puntaje++;
    }

    this.review.push({
      pregunta: preguntaActual.pregunta,
      correcta: esCorrecta,
      tuRespuesta: valor,
      respuestaCorrecta: preguntaActual.respuesta,
      explicacion: preguntaActual.explicacion
    });

    this.index++;

    if (this.index >= this.preguntas.length) {
      this.terminado = true;
      this.detenerTimer();
    }
  }

  reiniciar(): void {
    this.iniciarJuego();
  }

  get porcentaje(): number {
    return Math.round((this.puntaje / this.preguntasPorPartida) * 100);
  }

  get mensajeFinal(): string {
    const pct = this.porcentaje;
    if (pct === 100) {
      return "Excelente, dominás Angular sin problemas.";
    }
    if (pct >= 80) {
      return "Muy bien, casi perfecto.";
    }
    if (pct >= 60) {
      return "Bien, vas por buen camino.";
    }
    if (pct >= 40) {
      return "Necesitás practicar más para afianzarlo.";
    }
    if (pct >= 20) {
      return "A seguir estudiando, podés mejorar.";
    }
    return "Intentá de nuevo, cada intento suma.";
  }

  get medalla() {
    const pct = this.porcentaje;
    if (pct >= 90) {
      return {
        icono: '🥇',
        titulo: 'Experto',
        descripcion: 'Dominas todos los conceptos clave.',
        clase: 'medalla--oro'
      };
    }
    if (pct >= 70) {
      return {
        icono: '🥈',
        titulo: 'Intermedio',
        descripcion: 'Muy buen desempeño, seguí practicando.',
        clase: 'medalla--plata'
      };
    }
    if (pct >= 40) {
      return {
        icono: '🥉',
        titulo: 'Básico',
        descripcion: 'Cada intento suma experiencia.',
        clase: 'medalla--bronce'
      };
    }
    return {
      icono: '❌',
      titulo: 'Sin medalla',
      descripcion: 'Seguí practicando para mejorar.',
      clase: 'medalla--ninguna'
    };
  }

  private iniciarJuego(): void {
    this.index = 0;
    this.puntaje = 0;
    this.terminado = false;
    this.review = [];
    this.tiempo = 0;
    this.preguntas = this.obtenerPreguntasAleatorias();
    this.detenerTimer();
    this.intervalId = setInterval(() => this.tiempo++, 1000);
  }

  private obtenerPreguntasAleatorias(): PreguntaVF[] {
    const copia = [...this.preguntasPool];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia.slice(0, this.preguntasPorPartida);
  }

  private detenerTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

