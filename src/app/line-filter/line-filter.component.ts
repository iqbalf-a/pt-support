import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterElementComponent } from '../components/filter-element/filter-element.component';

interface Filter {
  name: string;
  equality: string;
  operator: string;
  value: string;
}

@Component({
  selector: 'app-line-filter',
  standalone: true,
  imports: [FormsModule, CommonModule, FilterElementComponent],
  templateUrl: './line-filter.component.html',
  styleUrls: ['./line-filter.component.css']
})
export class LineFilterComponent {
  filters: Filter[] = [];
  filterCount = 0;

  addFilter() {
    this.filterCount++;
    this.filters.push({
      name: `Filter ${this.filterCount}`,
      equality: 'is equal to',
      operator: 'contains',
      value: ''
    });
  }

  removeFilter(index: number) {
    this.filterCount--;
    this.filters.splice(index, 1);
  }

  removeAllFilter() {
    this.filterCount = 0;
    this.filters = [];
  }

  updateFilter(index: number, filterData: Filter) {
    this.filters[index] = filterData;
    console.log('Filter updated at index:', index, filterData);
  }

  proses() {
    console.log(this.filters);
  }
}
