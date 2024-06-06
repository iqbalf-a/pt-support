import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';


export interface CharInfo {
  no: Number;
  char: String;
  isDifferent: boolean;
}

export interface LineInfo {
  chars: CharInfo[];
}

@Component({
  selector: 'app-text-compare',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './text-compare.component.html',
  styleUrls: ['./text-compare.component.css']
})


export class TextCompareComponent {

  // get comparedText1Lines(): Array<{ character: string, isDifferent: boolean }[]> {
  //   return this.compareText(this.text1, this.text2);
  // }

  // get comparedText2Lines(): Array<{ character: string, isDifferent: boolean }[]> {
  //   return this.compareText(this.text2, this.text1);
  // }

  // compareText(text1: string, text2: string): Array<{ character: string, isDifferent: boolean }[]> {
  //   const lines1 = text1.split('\n');
  //   const lines2 = text2.split('\n');
  //   const maxLength = Math.max(lines1.length, lines2.length);

  //   return Array.from({ length: maxLength }, (_, i) => {
  //     return this.compareLine(lines1[i] || '', lines2[i] || '');
  //   });
  // }

  // compareLine(line1: string, line2: string): { character: string, isDifferent: boolean }[] {

  //   const splitLine1 = line1.split('');
  //   const splitLine2 = line2.split('');
  //   const maxLength = Math.max(splitLine1.length, splitLine2.length);

  //   let words1 = line1.trim().split(/\s+/);
  //   let words2 = line2.trim().split(/\s+/);

  //   if (words1.join(' ') !== words2.join(' ')) {
  //     return splitLine1.map(char => ({ character: char, isDifferent: true }));
  //   }

  //   return Array.from({ length: maxLength }, (_, index) => {
  //     const char1 = splitLine1[index] || '';
  //     const char2 = splitLine2[index] || '';
  //     const safeChar1 = char1 === ' ' ? '\u00A0' : char1;
  //     const isDifferent = char1 === ' ' && char1 !== char2;
  //     return { character: safeChar1, isDifferent };
  //   });
  // }

  text1: string = '';
  text2: string = '';

  get comparedText1Lines(): Array<{ character: string, isDifferent: boolean }[]> {
    return this.compareText(this.text1, this.text2);
  }

  get comparedText2Lines(): Array<{ character: string, isDifferent: boolean }[]> {
    return this.compareText(this.text2, this.text1);
  }

  compareText(text1: string, text2: string): Array<{ character: string, isDifferent: boolean }[]> {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLength = Math.max(lines1.length, lines2.length);

    return Array.from({ length: maxLength }, (_, i) => {
      return this.compareLine(lines1[i] || '', lines2[i] || '');
    });
  }

  compareLine(line1: string, line2: string): { character: string, isDifferent: boolean }[] {
    const splitLine1 = line1.split('');
    const splitLine2 = line2.split('');
    const maxLength = Math.max(splitLine1.length, splitLine2.length);

    return Array.from({ length: maxLength }, (_, index) => {
      const char1 = splitLine1[index] || '';
      const char2 = splitLine2[index] || '';
      const safeChar1 = char1 === ' ' ? '\u00A0' : char1; // Use non-breaking space for spaces
      return { character: safeChar1, isDifferent: char1 !== char2 };
    });
  }

  checkIfDifferent(line: { character: string; isDifferent: boolean }[]): boolean {
    return line.some(char => char.isDifferent);
  }

  // text1: string = '';
  // text2: string = '';
  // comparedText1: LineInfo[] = [];
  // comparedText2: LineInfo[] = [];



}
