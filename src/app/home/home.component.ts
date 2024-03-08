import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTimeComponent } from '../components/input-time/input-time.component';
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
  currentDate: string;
  sameDate: boolean = false;
  filterStartSeconds: number;
  filterEndSeconds: number;
  filterDurationSeconds: number;

  dateTimeContiner = {
    timeStart: '',
    timeResult: '00:00:00',
    date: ''
  }

  jobStart = { ...this.dateTimeContiner }
  jobEnd = { ...this.dateTimeContiner }
  monitorStart = { ...this.dateTimeContiner }
  filterStart = { ...this.dateTimeContiner }
  filterEnd = { ...this.dateTimeContiner }

  constructor() {

    const date = new Date();
    this.currentDate = date.toISOString().slice(0, 10);
    this.filterStartSeconds = 0;
    this.filterEndSeconds = 0;
    this.filterDurationSeconds = 0;

  }

  convertToUnixTimestamp(dateTimeString: string): number {
    const unixTimestamp = Date.parse(dateTimeString);
    return unixTimestamp / 1000;
  }

  secondsToTime(seconds: number): string {

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds.toString();

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  updateJobEndDate() {
    const today = new Date().toISOString().slice(0, 10);
    if (this.sameDate) {
      if (this.jobStart.date === '') {
        this.jobStart.date = today;
      }
      this.jobEnd.date = this.jobStart.date;
    }
  }


  calculate() {

    if ([this.jobStart.date, this.jobStart.timeStart, this.jobEnd.date, this.jobEnd.timeStart, this.monitorStart.date, this.monitorStart.timeStart].some(value => value === '')) {
      alert("Ada yang kosong ");
      return;
    }

    const unixJobStart = this.convertToUnixTimestamp(`${this.jobStart.date} ${this.jobStart.timeStart}`);
    const unixJobEnd = this.convertToUnixTimestamp(`${this.jobEnd.date} ${this.jobEnd.timeStart}`);
    const unixMonitorStart = this.convertToUnixTimestamp(`${this.monitorStart.date} ${this.monitorStart.timeStart}`);

    this.filterStartSeconds = unixJobStart - unixMonitorStart;
    this.filterDurationSeconds = unixJobEnd - unixJobStart;
    this.filterEndSeconds = this.filterStartSeconds + this.filterDurationSeconds;

    if (this.filterStartSeconds < 0) {
      alert("Monitor Start Tidak Boleh > Job Start");
      this.filterStartSeconds = 0;
      this.filterEndSeconds = 0;
    } else if (this.filterDurationSeconds < 0) {
      alert("Job End Tidak Boleh < Job Start");
      this.filterStartSeconds = 0;
      this.filterEndSeconds = 0;
    }

    this.filterStart.timeResult = this.secondsToTime(this.filterStartSeconds);
    this.filterEnd.timeResult = this.secondsToTime(this.filterEndSeconds);

  }

}
