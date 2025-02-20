import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterElementComponent } from '../../components/filter-element/filter-element.component';

export enum Operator {
  CONTAINS = 'contains',
  EQUALS = 'equals',
  STARTS_WITH = 'starts with',
  ENDS_WITH = 'ends with',
}

export enum Evaluator {
  IS_EQUAL_TO = 'is',
  IS_NOT_EQUAL_TO = 'is not',
}

interface Filter {
  name: string;
  evaluator: string;
  operator: string;
  value: string;
}

@Component({
  selector: 'app-text-filter',
  standalone: true,
  imports: [FormsModule, CommonModule, FilterElementComponent],
  templateUrl: './text-filter.component.html',
  styleUrls: ['./text-filter.component.css']
})
export class TextFilterComponent {
  inputText = '';
  outputText = '';
  filters: Filter[] = [];
  filterCount = 0;

  updateInputText(text: string) {
    this.inputText = text;
  }

  updateOutputtext(text: string) {
    this.outputText = text
  }

  clearInputText() {
    this.inputText = '';
  }

  addFilter() {
    this.filterCount++;
    this.filters.push({
      name: `${this.filterCount}.`,
      evaluator: Evaluator.IS_EQUAL_TO,
      operator: Operator.CONTAINS,
      value: ''
    });
  }

  removeFilter(index: number) {
    this.filterCount--;
    this.filters.splice(index, 1);
    this.filters.forEach((filter, i) => {
      filter.name = `${i + 1}.`;
    });
  }

  removeAllFilter() {
    this.filterCount = 0;
    this.filters = [];
  }

  updateFilter(index: number, filterData: Filter) {
    this.filters[index] = filterData;
    console.log('Filter updated at index:', index, filterData);
  }

  processFilter() {
    if (this.inputText === "") return alert('input text masih kosong!');


    if (this.filters.length < 1) return alert("minimal ada satu filter ditambahkan!");


    this.filters.forEach((filter, i) => {
      if (filter.value === '') return alert("filter value tidak boleh kosong!");
    })

    this.outputText = this.inputText;
    let dataSplit = this.inputText.split('\n');
    const result = dataSplit.filter((item) => {
      let data = item.split('\t')[0];
      let statusData: boolean;
      let statusDatas: boolean[] = [];
      this.filters.forEach((filter, index) => {
        switch (filter.operator) {
          case Operator.CONTAINS:
            statusData = data.toLocaleLowerCase().includes(filter.value.toLocaleLowerCase());
            break;
          case Operator.EQUALS:
            statusData = data.toLocaleLowerCase() === filter.value.toLocaleLowerCase();
            break;
          case Operator.ENDS_WITH:
            statusData = data.toLocaleLowerCase().endsWith(filter.value.toLocaleLowerCase())
            break;
          case Operator.STARTS_WITH:
            statusData = data.toLocaleLowerCase().startsWith(filter.value.toLowerCase())
            break;
          default:
            statusData = true;
        }
        if (filter.evaluator === Evaluator.IS_NOT_EQUAL_TO) {
          statusData = !statusData;
        }
        statusDatas.push(statusData);
      })
      let result = statusDatas.every(status => status === true);
      return result;
    })
    this.outputText = result.join('\n');
    if (this.outputText === "") {
      alert('tidak ada line yang sesuai dengan filter anda!');
    }

  }
}


