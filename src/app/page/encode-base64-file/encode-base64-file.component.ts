import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-encode-base64-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './encode-base64-file.component.html',
  styleUrl: './encode-base64-file.component.css'
})
export class EncodeBase64FileComponent implements OnDestroy {
  outputText!: string;
  fileToEncode!: File;
  encodedBase64: string | null = null;
  encodedBase64Value: string | null = null;
  showAlert: boolean = false;
  private alertTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private clipboard: Clipboard) { }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file: File = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;
        this.fileToEncode = file;
        this.encodedBase64 = result;

        const base64Index = result.indexOf("base64,") + "base64,".length;
        this.encodedBase64Value = result.substring(base64Index);
      };

      reader.readAsDataURL(file);
    }
  }

  copyEncodedBase64ToClipboard() {
    if (this.encodedBase64) {
      this.clipboard.copy(this.encodedBase64);
      this.triggerAlert();
    }
  }

  copyEncodedBase64ValueToClipboard() {
    if (this.encodedBase64Value) {
      this.clipboard.copy(this.encodedBase64Value);
      this.triggerAlert();
    }
  }

  private triggerAlert() {
    this.showAlert = true;
    if (this.alertTimeout) clearTimeout(this.alertTimeout);
    this.alertTimeout = setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  ngOnDestroy() {
    if (this.alertTimeout) clearTimeout(this.alertTimeout);
  }
}
