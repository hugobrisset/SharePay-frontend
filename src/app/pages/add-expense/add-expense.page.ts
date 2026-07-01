import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ExpenseService } from 'src/app/services/expense.service';

import {AppHeaderComponent } from 'src/app/components/app-header/app-header.component';
import { ExpenseDetailsComponent } from 'src/app/components/expense-details/expense-details.component';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, AppHeaderComponent, ExpenseDetailsComponent]
})
export class AddExpensePage implements OnInit {

  @ViewChild(ExpenseDetailsComponent)
  expenseDetails!: ExpenseDetailsComponent;

  groupId!: number;

  constructor(
    private expenseService: ExpenseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() { 
    this.groupId = Number(this.route.snapshot.paramMap.get('groupId'));
  }

  submit() {
    const payload = this.expenseDetails.buildPayload();
    if (!payload) return;

    this.expenseService.createExpense(this.expenseDetails.groupId, payload).subscribe({
    next: (res) => {
      // reset form
      this.expenseDetails.expenseName = '';
      this.expenseDetails.amount = null;

      this.expenseDetails.goBackToExpense(this.expenseDetails.groupId);
    },
    error: (err) => {
      console.error('Error creating expense:', err);
    }
    });
  }

}
