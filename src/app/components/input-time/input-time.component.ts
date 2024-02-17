import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-time',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-time.component.html',
  styleUrl: './input-time.component.css',
})
export class InputTimeComponent {
  constructor() {
    this.ngModelValue = '';
    this.labelText = '';
  }

  @Input() ngModelValue: string;
  @Output() ngModelValueChange = new EventEmitter<string>();
  @Input() labelText: string;

  onNgModelValueChange(newValue: string) {    
    this.ngModelValue = newValue;
    this.ngModelValueChange.emit(newValue);
  }
}
