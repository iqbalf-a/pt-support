import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  imageSrc: string = '../assets/pt-icon.png';
  constructor(private router: Router) { }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
  
}
