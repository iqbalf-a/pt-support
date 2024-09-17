import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTimeComponent } from '../../components/input-time/input-time.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, InputTimeComponent, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
buttonTop: number = 0;
  buttonLeft: number = 0;

  moveButton() {
    const button = document.querySelector('button') as HTMLElement;
    const parent = button.parentElement as HTMLElement;

    const parentHeight = parent.clientHeight;
    const parentWidth = parent.clientWidth;
    const buttonHeight = button.clientHeight;
    const buttonWidth = button.clientWidth;

    const verticalRange = parentHeight - buttonHeight;
    const horizontalRange = parentWidth - buttonWidth;

    const maxVerticalMovement = verticalRange * 0.8 + 400;
    const maxHorizontalMovement = horizontalRange * 0.8;

    this.buttonTop = Math.random() * maxVerticalMovement;
    this.buttonLeft = Math.random() * maxHorizontalMovement;
  }
  clicked() {
    return alert("yey!!");
  }
}
