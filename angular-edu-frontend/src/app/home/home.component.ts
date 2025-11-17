import { Component, OnInit } from '@angular/core';
import { ApiService, ApiInfo } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  info: ApiInfo | null = null;
  loading: boolean = true;
  error: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loading = true;
    this.error = false;
    
    this.apiService.getInfo().subscribe({
      next: (data) => {
        this.info = data;
        this.loading = false;
        this.error = false;
      },
      error: (error) => {
        console.error('Error loading info:', error);
        this.loading = false;
        this.error = true;
      }
    });
  }
}
