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

  constructor() {
    this.inputText = ''
    this.outputText = ''
  }

  convertToString() {
    let result: string = '';

    result = this.inputText.replace(/\r?\n|\r|\s+/g, "");
    result = result.replace(/"/g, '\\"');
    result = result.replace(/$/gm, '"');
    result = result.replace(/^/gm, '"');

    this.outputText = result;
  }

}
