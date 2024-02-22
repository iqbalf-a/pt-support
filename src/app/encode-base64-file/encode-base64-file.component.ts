import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-encode-base64-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './encode-base64-file.component.html',
  styleUrl: './encode-base64-file.component.css'
})
export class EncodeBase64FileComponent {
  outputText!: string;
  fileToEncode!: File;
  encodedBase64: string | null = null;
  encodedBase64Value: string | null = null;

  constructor() { }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file: File = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.fileToEncode = file;
        this.encodedBase64 = e.target.result;

        const base64Index = e.target.result.indexOf("base64,") + "base64,".length;
        this.encodedBase64Value = e.target.result.substring(base64Index);
      };

      reader.readAsDataURL(file);
    }
  }
}
