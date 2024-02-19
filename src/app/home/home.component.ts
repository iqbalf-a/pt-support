import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTimeComponent } from '../components/input-time/input-time.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, InputTimeComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentDate: string;
  startFilterSeconds: number;
  endFilterSeconds: number;
  durationFilterSeconds: number;

  time = {
    startDate: '',
    unixTimestamp: 0,
    hours: '',
    minutes: '',
    seconds: '',
  };

  startJob = { ...this.time };
  endJob = { ...this.time };
  monitor = { ...this.time };
  monitorDuration = { ...this.time };
  monitorFilter = { ...this.time };

  constructor() {
    const date = new Date();
    this.currentDate = date.toISOString().slice(0, 10);
    this.startFilterSeconds = 0;
    this.endFilterSeconds = 0;
    this.durationFilterSeconds = 0;

  }

  printJobStart() {

    this.startJob.hours = this.setToDoubleZeroIfEmpty(this.startJob.hours);
    this.startJob.minutes = this.setToDoubleZeroIfEmpty(this.startJob.minutes);
    this.startJob.seconds = this.setToDoubleZeroIfEmpty(this.startJob.seconds);

    this.endJob.hours = this.setToDoubleZeroIfEmpty(this.endJob.hours);
    this.endJob.minutes = this.setToDoubleZeroIfEmpty(this.endJob.minutes);
    this.endJob.seconds = this.setToDoubleZeroIfEmpty(this.endJob.seconds);

    this.monitor.hours = this.setToDoubleZeroIfEmpty(this.monitor.hours);
    this.monitor.minutes = this.setToDoubleZeroIfEmpty(this.monitor.minutes);
    this.monitor.seconds = this.setToDoubleZeroIfEmpty(this.monitor.seconds);

    this.monitorDuration.hours = this.setToDoubleZeroIfEmpty(this.monitorDuration.hours);
    this.monitorDuration.minutes = this.setToDoubleZeroIfEmpty(this.monitorDuration.minutes);
    this.monitorDuration.seconds = this.setToDoubleZeroIfEmpty(this.monitorDuration.seconds);

    this.startJob.startDate = `${this.currentDate} ${this.startJob.hours}:${this.startJob.minutes}:${this.startJob.seconds}`;
    this.endJob.startDate = `${this.currentDate} ${this.endJob.hours}:${this.endJob.minutes}:${this.endJob.seconds}`;
    this.monitor.startDate = `${this.currentDate} ${this.monitor.hours}:${this.monitor.minutes}:${this.monitor.seconds}`;
    this.monitorDuration.startDate = `${this.monitorDuration.hours}:${this.monitorDuration.minutes}:${this.monitorDuration.seconds}`;

    this.startJob.unixTimestamp = this.convertToUnixTimestamp(this.startJob.startDate);
    this.endJob.unixTimestamp = this.convertToUnixTimestamp(this.endJob.startDate);
    this.monitor.unixTimestamp = this.convertToUnixTimestamp(this.monitor.startDate);
    this.monitorDuration.unixTimestamp = this.timeToSeconds(this.monitorDuration.startDate);



    this.startFilterSeconds = this.startJob.unixTimestamp - this.monitor.unixTimestamp;
    this.durationFilterSeconds = this.endJob.unixTimestamp  - this.startJob.unixTimestamp;
    this.endFilterSeconds = this.startFilterSeconds + this.durationFilterSeconds;
    
    

    // set to 0
    // this.startJob = { ...this.time, startDate: this.startJob.startDate, unixTimestamp: this.startJob.unixTimestamp };
    // this.monitor = { ...this.time, startDate: this.monitor.startDate, unixTimestamp: this.monitor.unixTimestamp };
    // this.monitorDuration = { ...this.time, startDate: this.monitorDuration.startDate, unixTimestamp: this.monitorDuration.unixTimestamp };

    // start filter = start job - start monitor
    // end filter = start filter + durasi job
  }

  setToDoubleZeroIfEmpty(value: string): string {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return '00';
    }

    return trimmedValue.length === 1 ? `0${trimmedValue}` : trimmedValue;
  }

  convertToUnixTimestamp(dateTimeString: string): number {
    const unixTimestamp = Date.parse(dateTimeString);
    return unixTimestamp / 1000;
  }

  timeToSeconds(timeString: string) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;

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

}
