import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-json-to-string',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './json-to-string.component.html',
  styleUrl: './json-to-string.component.css'
})
export class JsonToStringComponent {

  inputText: string;
  outputText: string;
  isChecked: boolean;

  constructor() {
    this.inputText = ''
    this.outputText = ''
    this.isChecked = false;
  }

  convertToString() {
    let result: string = '';

    result = this.inputText.replace(/ +|\t/g, "");

    if (this.isChecked) {
      result = result.replace(/\s/g, "");
    }

    result = result.replace(/"/g, '\\"');
    result = result.replace(/$/gm, '"');
    result = result.replace(/^/gm, '"');

    this.outputText = result;
  }

}
