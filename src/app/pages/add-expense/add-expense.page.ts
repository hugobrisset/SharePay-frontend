import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExpenseService } from 'src/app/services/expense.service';
import { Router } from '@angular/router';
import { FocusService } from 'src/app/core/focus.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AddExpensePage implements OnInit {

  groupId!: number;

  expenseName: string = '';
  amount: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private router: Router,
    private focusService: FocusService
  ) {}

  ngOnInit() {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
  }

  submit() {
     if (!this.expenseName || !this.amount) return;

     this.expenseService.createExpense(this.groupId, {
      title: this.expenseName,
      amount: this.amount
    }).subscribe({
      next: (res) => {
        console.log('Expense created:', res);

        // reset form
        this.expenseName = '';
        this.amount = null;

        this.goBackToExpense(this.groupId);
      },
      error: (err) => {
        console.error('Error creating expense:', err);
      }
    });
  }

  goBackToExpense(groupId: number) {
    this.focusService.clearFocus();
    this.router.navigate(['/groups', groupId]);
  }
}
