import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encode-base64',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './encode-base64.component.html',
  styleUrl: './encode-base64.component.css'
})
export class EncodeBase64Component {

  inputText: string;
  outputText: string;
  isChecked: boolean;

  constructor() {
    this.inputText = ''
    this.outputText = ''
    this.isChecked = false;
  }

  encode() {
    console.log(this.isChecked);

    let result: string = '';
    if (this.isChecked) {
      let text: string[];
      text = this.inputText.split('\n');
      text.forEach((item, index) => {
        result += btoa(item);
        if (index < text.length - 1) {
          result += '\n'
        }
      })
    } else {
      let text: string;
      text = this.inputText;
      result = btoa(text);
    }
    // this.outputText = btoa(this.inputText);
    this.outputText = result;
  }

}
