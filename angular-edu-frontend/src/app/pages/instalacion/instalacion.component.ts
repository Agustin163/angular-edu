import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, ApiInfo } from '../../services/api.service';

@Component({
  selector: 'app-instalacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instalacion.component.html',
  styleUrl: './instalacion.component.css'
})
export class InstalacionComponent implements OnInit {
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

