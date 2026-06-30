import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class ExpensesListComponent  {

  @Input() expenses: any[] = [];
  
  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<number>();

  get sortedExpenses() {
    return [...this.expenses].sort((a, b) => {
      return new Date(b.expense_date).getTime() -
            new Date(a.expense_date).getTime();
    });
  }
  
  onAdd() {
    this.add.emit();
  }

  onEdit(id: number) {
    this.edit.emit(id);
  }

}
