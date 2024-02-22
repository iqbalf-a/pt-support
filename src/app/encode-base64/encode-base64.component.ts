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

  constructor(){
    this.inputText = ''
    this.outputText = ''
  }

  generate() {
    this.outputText = btoa(this.inputText);
  }

}
