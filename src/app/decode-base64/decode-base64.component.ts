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

  constructor(){
    this.inputText = ''
    this.outputText = ''
  }

  generate() {
    this.outputText = atob(this.inputText);
  }
}
