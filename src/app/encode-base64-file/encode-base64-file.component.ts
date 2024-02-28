import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

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
  showAlert: boolean = false; // New variable to control alert visibility

  constructor(private clipboard: Clipboard) { }

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

  copyEncodedBase64ToClipboard() {
    if (this.encodedBase64) {
      this.clipboard.copy(this.encodedBase64);
      this.showAlert = true; // Show alert when copied
      setTimeout(() => {
        this.showAlert = false; // Hide alert after 3 seconds
      }, 3000);
    }
  }

  copyEncodedBase64ValueToClipboard() {
    if (this.encodedBase64Value) {
      this.clipboard.copy(this.encodedBase64Value);
      this.showAlert = true; // Show alert when copied
      setTimeout(() => {
        this.showAlert = false; // Hide alert after 3 seconds
      }, 3000);
    }
  }
}
