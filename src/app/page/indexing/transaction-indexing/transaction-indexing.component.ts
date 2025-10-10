import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-indexing',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './transaction-indexing.component.html',
  styleUrl: './transaction-indexing.component.css'
})
export class TransactionIndexingComponent {

  inputText: string = '';
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

    const patternTransName = /(.lr_save_string\(")(\w[^_]+_)(\w[^_])(\w+)(.+)/;
    const patternTransName2 = /(.lr_start_transaction\(")(\w[^_]+_)(\w[^_])(\w+)(.+)/;

    let transNameBefore = '';
    let transNameAfter = '';
    let currentText;
    let currentTextSplit: RegExpMatchArray | null = null;
    let formattedIndexStep: string = "";

    let result: string = '';
    let dataSplitLength: number = 0;
    // let currentIndex = this.indexStart;

    const dataSplit = this.inputText.split('\n');
    dataSplitLength = dataSplit.length;
    for (let i = 0; i < dataSplitLength - 1; i++) {
      currentText = dataSplit[i];
      if (currentText.includes('lr_save_string("B')) {
        // if (currentText.includes('lr_start_transaction("B')) {
        currentTextSplit = currentText.match(patternTransName);

        if (currentTextSplit) {
          transNameBefore = currentTextSplit[2] + currentTextSplit[3] + currentTextSplit[4];

          formattedIndexStep = this.indexStart.toString().padStart(2, "0");

          transNameAfter = currentTextSplit[2] + formattedIndexStep + currentTextSplit[4];

          dataSplit[i] = currentTextSplit[1] + transNameAfter + currentTextSplit[5];

          this.indexStart++;
        } else if (currentText.includes('lr_start_transaction("B')) {
          const currentTextSplit = currentText.match(patternTransName2);

          if (currentTextSplit) {
            transNameBefore =
              (currentTextSplit[2] ?? "") +
              (currentTextSplit[3] ?? "") +
              (currentTextSplit[4] ?? "");

            formattedIndexStep = this.indexStart.toString().padStart(2, "0");

            transNameAfter =
              (currentTextSplit[2] ?? "") +
              formattedIndexStep +
              (currentTextSplit[4] ?? "");

            dataSplit[i] =
              (currentTextSplit[1] ?? "") +
              transNameAfter +
              (currentTextSplit[5] ?? "");
          }
        }

        if (transNameBefore && currentText.includes(transNameBefore)) {
          const patternStepResult = new RegExp(`(.+)(${transNameBefore})(.+)`);
          const currentTextSplit = currentText.match(patternStepResult);

          if (currentTextSplit) {
            dataSplit[i] =
              (currentTextSplit[1] ?? "") +
              transNameAfter +
              (currentTextSplit[3] ?? "");
          }
        } else {
          continue;
        }
      }

      result = dataSplit.join('\n');

      this.outputText = result;
    }
  }

}

