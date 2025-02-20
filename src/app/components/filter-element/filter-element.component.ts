import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Evaluator, Operator } from '../../page/text-filter/text-filter.component';

@Component({
  selector: 'app-filter-element',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter-element.component.html',
  styleUrls: ['./filter-element.component.css']
})
export class FilterElementComponent {
  evaluators = Object.values(Evaluator);
  operators = Object.values(Operator);

  @Input() filter: { name: string, evaluator: string, operator: string, value: string } = {
    name: '',
    evaluator: 'is equal to',
    operator: 'contains',
    value: ''
  };
  @Output() remove = new EventEmitter<void>();
  @Output() filterChanged = new EventEmitter<{ name: string, evaluator: string, operator: string, value: string }>();

  onFilterChange() {
    this.emitFilterChange();
  }

  private emitFilterChange() {
    console.log('Filter Changed:', this.filter);
    this.filterChanged.emit(this.filter);
  }

  removeFilter() {
    this.remove.emit();
  }
}
