import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ExpenseService } from 'src/app/services/expense.service';
import { FocusService } from 'src/app/core/focus.service';

import {AppHeaderComponent } from 'src/app/components/app-header/app-header.component';
import { ExpenseDetailsComponent } from 'src/app/components/expense-details/expense-details.component';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.page.html',
  styleUrls: ['./edit-expense.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, AppHeaderComponent, ExpenseDetailsComponent]
})
export class EditExpensePage implements OnInit {

  @ViewChild(ExpenseDetailsComponent)
  expenseDetails!: ExpenseDetailsComponent;

  expenseId!: number;
  groupId!: number;

  expenseData: any;

  constructor(
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router,
    private focusService: FocusService,
  ) {}

  ngOnInit() {
    this.groupId = Number(this.route.snapshot.paramMap.get('groupId'));
    this.expenseId = Number(this.route.snapshot.paramMap.get('expenseId'));

    this.loadExpense();
  }

  loadExpense() {
    this.expenseService.getExpense(this.expenseId)
      .subscribe({
        next: (res) => {
          console.log("res :", res);
          this.expenseData = res;

          if (this.expenseDetails) {
            this.expenseDetails.setExpense(res);
          }
        },
        error: console.error
      });
  }

  submit(){
    const payload = this.expenseDetails.buildPayload();
    if (!payload) {
      console.error("Payload invalide");
      return;
    }

    this.expenseService.updateExpense(
      this.expenseId,
      this.groupId,
      payload
    ).subscribe({
      next: () => {
        // retour page groupe
        this.focusService.clearFocus();
        this.router.navigate(['/groups', this.groupId]);
      },
      error: (err) => {
        console.error("Update failed", err);
      }
    });
  
  }


}
