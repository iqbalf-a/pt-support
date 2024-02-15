import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  currentDate: string;

  constructor() {
    const date = new Date();
    this.currentDate = date.toISOString().slice(0, 10);
  }

  jobStart = '';
  jobStartUnix = 0;
  jobHours = '';
  jobMinute = '';
  jobSecond = '';

  monitorStart = '';
  monitorHours = '';
  monitorMinute = '';
  monitorSecond = '';

  printJobStart() {
    this.jobHours = this.jobHours.trim() ? this.jobHours : '00';
    this.jobMinute = this.jobMinute.trim() ? this.jobMinute : '00';
    this.jobSecond = this.jobSecond.trim() ? this.jobSecond : '00';

    this.monitorHours = this.monitorHours.trim() ? this.monitorHours : '00';
    this.monitorMinute = this.monitorMinute.trim() ? this.monitorMinute : '00';
    this.monitorSecond = this.monitorSecond.trim() ? this.monitorSecond : '00';

    this.jobStart = `${this.currentDate} ${this.jobHours}:${this.jobMinute}:${this.jobSecond}`;
    this.monitorStart = `${this.currentDate} ${this.monitorHours}:${this.monitorMinute}:${this.monitorSecond}`;
    // this.jobStartUnix = Math.floor(new Date(this.jobStart).getTime() / 1000);
  }
}
