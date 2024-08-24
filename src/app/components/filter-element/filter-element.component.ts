import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-element',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-element.component.html',
  styleUrls: ['./filter-element.component.css']
})
export class FilterElementComponent {
  @Input() filter: { name: string, equality: string, operator: string, value: string } = {
    name: '',
    equality: 'is equal to',
    operator: 'contains',
    value: ''
  };
  @Output() remove = new EventEmitter<void>();
  @Output() filterChanged = new EventEmitter<{ name: string, equality: string, operator: string, value: string }>();

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
