import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-comandos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comandos.component.html',
  styleUrl: './comandos.component.css'
})
export class ComandosComponent implements OnInit {
  data: any;
  loading: boolean = true;
  error: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getComandos().subscribe({
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

