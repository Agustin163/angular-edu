import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PreguntaMC {
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
}

interface RevisionMC {
  pregunta: string;
  correcta: boolean;
  tuRespuesta: string;
  respuestaCorrecta: string;
  explicacion: string;
}

@Component({
  standalone: true,
  selector: 'app-mc',
  imports: [CommonModule, RouterModule],
  templateUrl: './multiple-choice.page.html',
  styleUrls: ['./multiple-choice.page.css']
})
export class MultipleChoicePage implements OnInit, OnDestroy {

  index = 0;
  puntaje = 0;
  terminado = false;
  tiempo = 0;
  preguntas: PreguntaMC[] = [];
  review: RevisionMC[] = [];

  private readonly preguntasPorPartida = 5;
  private intervalId: any = null;
  private preguntasPool: PreguntaMC[] = [
    {
      pregunta: "¿Qué comando crea un nuevo proyecto Angular?",
      opciones: ["ng new", "ng create", "ng init", "ng start"],
      correcta: 0,
      explicacion: "“ng new” genera toda la estructura inicial de un proyecto Angular."
    },
    {
      pregunta: "¿Qué elemento es obligatorio en un componente Angular?",
      opciones: ["template", "service", "guard", "resolver"],
      correcta: 0,
      explicacion: "Todo componente necesita un template para renderizar su vista."
    },
    {
      pregunta: "¿Qué servicio se usa para llamar al backend?",
      opciones: ["HttpClient", "FormBuilder", "Router", "Renderer2"],
      correcta: 0,
      explicacion: "HttpClient encapsula las peticiones HTTP."
    },
    {
      pregunta: "¿Cómo se llama el archivo principal de estilos globales?",
      opciones: ["styles.css", "main.css", "global.scss", "app.styles"],
      correcta: 0,
      explicacion: "Por defecto Angular usa `src/styles.css` como hoja global."
    },
    {
      pregunta: "¿Qué archivo define las rutas en un proyecto standalone?",
      opciones: ["app.routes.ts", "app.config.ts", "app.component.ts", "server.ts"],
      correcta: 0,
      explicacion: "app.routes.ts contiene el arreglo Routes exportado."
    },
    {
      pregunta: "¿Qué decorador se usa para emitir eventos al componente padre?",
      opciones: ["@Output", "@Input", "@Directive", "@Injectable"],
      correcta: 0,
      explicacion: "@Output expone un EventEmitter al componente padre."
    },
    {
      pregunta: "¿Qué módulo se importa para utilizar HttpClient?",
      opciones: ["HttpClientModule", "FormsModule", "BrowserModule", "RouterModule"],
      correcta: 0,
      explicacion: "HttpClientModule registra los proveedores necesarios."
    },
    {
      pregunta: "¿Qué comando ejecuta las pruebas unitarias por defecto?",
      opciones: ["ng test", "ng verify", "ng run tests", "ng karma"],
      correcta: 0,
      explicacion: "`ng test` levanta Karma y ejecuta las pruebas."
    },
    {
      pregunta: "¿Qué herramienta agiliza la generación de componentes?",
      opciones: ["Angular CLI", "Webpack", "ESLint", "Docker"],
      correcta: 0,
      explicacion: "Angular CLI incluye esquemas para generar artefactos."
    },
    {
      pregunta: "¿Qué motor de plantillas utiliza Angular?",
      opciones: ["HTML con sintaxis Angular", "Twig", "Handlebars", "JSX"],
      correcta: 0,
      explicacion: "Angular extiende HTML con bindings y directivas."
    }
  ];

  ngOnInit(): void {
    this.iniciarJuego();
  }

  ngOnDestroy(): void {
    this.detenerTimer();
  }

  responder(indice: number): void {
    if (this.terminado || !this.preguntas[this.index]) {
      return;
    }

    const preguntaActual = this.preguntas[this.index];
    const correcta = preguntaActual.correcta;
    const esCorrecta = indice === correcta;
    const tuRespuesta = preguntaActual.opciones[indice];
    const respuestaCorrecta = preguntaActual.opciones[correcta];

    if (esCorrecta) {
      this.puntaje++;
    }

    this.review.push({
      pregunta: preguntaActual.pregunta,
      correcta: esCorrecta,
      tuRespuesta,
      respuestaCorrecta,
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
      return "Excelente dominio de Angular.";
    }
    if (pct >= 80) {
      return "Muy bien, casi perfecto.";
    }
    if (pct >= 60) {
      return "Bien, tu base es sólida.";
    }
    if (pct >= 40) {
      return "Necesitás practicar un poco más.";
    }
    if (pct >= 20) {
      return "A seguir estudiando, cada intento ayuda.";
    }
    return "Intentá nuevamente y no te rindas.";
  }

  get medalla() {
    const pct = this.porcentaje;
    if (pct >= 90) {
      return {
        icono: '🥇',
        titulo: 'Experto',
        descripcion: 'Superaste todas las preguntas.',
        clase: 'medalla--oro'
      };
    }
    if (pct >= 70) {
      return {
        icono: '🥈',
        titulo: 'Intermedio',
        descripcion: 'Gran avance, seguí así.',
        clase: 'medalla--plata'
      };
    }
    if (pct >= 40) {
      return {
        icono: '🥉',
        titulo: 'Básico',
        descripcion: 'Con práctica vas a mejorar.',
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

  private obtenerPreguntasAleatorias(): PreguntaMC[] {
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

