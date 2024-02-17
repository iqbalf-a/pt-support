import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTimeComponent } from '../components/input-time/input-time.component';
import { CommonModule } from '@angular/common';
import { start } from 'repl';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, InputTimeComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentDate: string;

  time = {
    startDate: '',
    hours: '',
    minutes: '',
    seconds: '',
  };

  job = { ...this.time };
  monitor = { ...this.time };
  monitorDuration = { ...this.time };
  monitorFilter = { ...this.time };

  constructor() {
    const date = new Date();
    this.currentDate = date.toISOString().slice(0, 10);
  }

  printJobStart() {
    this.job.hours = this.setToDoubleZeroIfEmpty(this.job.hours);
    this.job.minutes = this.setToDoubleZeroIfEmpty(this.job.minutes);
    this.job.seconds = this.setToDoubleZeroIfEmpty(this.job.seconds);

    this.monitor.hours = this.setToDoubleZeroIfEmpty(this.monitor.hours);
    this.monitor.minutes = this.setToDoubleZeroIfEmpty(this.monitor.minutes);
    this.monitor.seconds = this.setToDoubleZeroIfEmpty(this.monitor.seconds);

    this.job.startDate = `${this.currentDate} ${this.job.hours}:${this.job.minutes}:${this.job.seconds}`;
    this.monitor.startDate = `${this.currentDate} ${this.monitor.hours}:${this.monitor.minutes}:${this.monitor.seconds}`;
    // this.jobStartUnix = Math.floor(new Date(this.jobStart).getTime() / 1000);

    this.job = { ...this.time, startDate: this.job.startDate };
  }

  setToDoubleZeroIfEmpty(value: string): string {
    return value.trim() ? value : '00';
  }
}
