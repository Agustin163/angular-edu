import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ventajas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventajas.component.html',
  styleUrl: './ventajas.component.css'
})
export class VentajasComponent implements OnInit {
  data: any;
  loading: boolean = true;
  error: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getVentajas().subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}

