import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snapshot-indexing',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './snapshot-indexing.component.html',
  styleUrl: './snapshot-indexing.component.css'
})

export class SnapshotIndexingComponent {

  inputText: string = '';;
  outputText: string = '';
  indexStart: number = 1;
  showAlert: boolean = false;

  constructor(private clipboard: Clipboard) { }

  copyOutputTextToClipboard() {
    if (this.outputText) {
      this.clipboard.copy(this.outputText);
      this.showAlert = true; // Show alert when copied
      setTimeout(() => {
        this.showAlert = false; // Hide alert after 3 seconds
      }, 3000);
    }
  }

  process() {
    const patternSnapshot = /(.+Snapshot=t)(\d+)(.+)/;

    let result: string = '';
    let dataSplitLength: number = 0;
    let currentIndex = this.indexStart;

    const dataSplit = this.inputText.split('\n');
    dataSplitLength = dataSplit.length;
    for (let i = 0; i < dataSplitLength - 1; i++) {
      if (dataSplit[i].toLowerCase().includes('snapshot')) {
        const currentLine = dataSplit[i].match(patternSnapshot);
        if (currentLine) {
          dataSplit[i] = currentLine[1] + currentIndex + currentLine[3];
        }
        currentIndex++;
      }
    }

    result = dataSplit.join('\n');

    this.outputText = result;
  }
}
