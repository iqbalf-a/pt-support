import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavbarComponent],
  // templateUrl: './app.component.html',
  template: `<app-navbar></app-navbar>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pt-support';
}
