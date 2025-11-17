import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, ApiInfo } from '../../services/api.service';

@Component({
  selector: 'app-acerca-del-proyecto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acerca-del-proyecto.component.html',
  styleUrl: './acerca-del-proyecto.component.css'
})
export class AcercaDelProyectoComponent implements OnInit {
  info: ApiInfo | null = null;
  loading = true;
  error = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getInfo().subscribe({
      next: (res) => {
        this.info = res;
        this.loading = false;
        this.error = false;
      },
      error: (err) => {
        console.error('Error loading info:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}


