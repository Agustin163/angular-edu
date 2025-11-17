import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-caracteristicas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caracteristicas.component.html',
  styleUrl: './caracteristicas.component.css'
})
export class CaracteristicasComponent implements OnInit {
  data: any;
  loading: boolean = true;
  error: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCaracteristicas().subscribe({
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

