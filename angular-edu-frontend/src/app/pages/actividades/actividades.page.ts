import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-actividades',
  imports: [CommonModule, RouterModule],
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.css']
})
export class ActividadesPage {
  onCardClick(event: Event): void {
    const card = (event.currentTarget as HTMLElement);
    card.classList.add('activity-card--pulse');
    
    setTimeout(() => {
      card.classList.remove('activity-card--pulse');
    }, 180);
  }
}

