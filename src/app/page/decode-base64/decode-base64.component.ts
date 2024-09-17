import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-decode-base64',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './decode-base64.component.html',
  styleUrl: './decode-base64.component.css'
})
export class DecodeBase64Component {
  inputText: string;
  outputText: string;
  isChecked: boolean;

  constructor(){
    this.inputText = ''
    this.outputText = ''
    this.isChecked = false;
  }

  decode() {
    console.log(this.isChecked);

    let result: string = '';
    if (this.isChecked) {
      let text: string[];
      text = this.inputText.split('\n');
      text.forEach((item, index) => {
        result += atob(item);
        if (index < text.length - 1) {
          result += '\n'
        }
      })
    } else {
      let text: string;
      text = this.inputText;
      result = atob(text);
    }
    // this.outputText = btoa(this.inputText);
    this.outputText = result;
  }
}
