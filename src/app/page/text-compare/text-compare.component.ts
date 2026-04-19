import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


export interface CharInfo {
  char: String;
  isDifferent: boolean;
}

export interface LineInfo {
  no: number | string;
  chars: CharInfo[];
}

@Component({
  selector: 'app-text-compare',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './text-compare.component.html',
  styleUrls: ['./text-compare.component.css']
})


export class TextCompareComponent {

  checkIfDifferent(line: CharInfo[]): boolean {
    return line.some(char => char.isDifferent);
  }

  text1: string = '';
  text2: string = '';
  comparedText1: LineInfo[] = [];
  comparedText2: LineInfo[] = [];

  get comparedText1Lines(): LineInfo[] {
    return this.compareText(this.text1, this.text2);
  }

  get comparedText2Lines(): LineInfo[] {
    return this.compareText(this.text2, this.text1);
  }

  compareText(text1: string, text2: string): LineInfo[] {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLength = Math.max(lines1.length, lines2.length);

    return Array.from({ length: maxLength }, (_, i) => {
      return this.compareLine(i + 1, lines1[i] || '', lines2[i] || '');
    });
  }

  compareLine(no: number | string, line1: string, line2: string): LineInfo {
    const splitLine1 = line1.split('');
    const splitLine2 = line2.split('');
    const maxLength = Math.max(splitLine1.length, splitLine2.length);

    const chars: CharInfo[] = Array.from({ length: maxLength }, (_, index) => {
      const char1 = splitLine1[index] || '';
      const char2 = splitLine2[index] || '';
      return {
        char: char1 || char2,
        isDifferent: char1 !== char2
      }
    })

    return {
      no: no,
      chars: chars
    }
  }

}
