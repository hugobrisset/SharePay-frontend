import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { FocusService } from 'src/app/core/focus.service';
import { GroupService } from 'src/app/services/group.service';
import { InviteService } from 'src/app/services/invite.service';
import { ExpenseService } from 'src/app/services/expense.service';

import { AppHeaderComponent } from 'src/app/components/app-header/app-header.component';
import { ExpensesListComponent } from 'src/app/components/expenses-list/expenses-list.component';
import { BalanceListComponent } from 'src/app/components/balance-list/balance-list.component';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.page.html',
  styleUrls: ['./group-details.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, AppHeaderComponent, ExpensesListComponent, BalanceListComponent]
})
export class GroupDetailsPage implements OnInit {

  groupId!: number;
  expenses: any[] = [];
  inviteLink = '';

  balances: any[] = [];

  viewMode: 'expenses' | 'balance' = 'expenses';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private focusService: FocusService,
    private groupService: GroupService,
    private inviteService: InviteService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit() {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ionViewWillEnter() {
    this.loadExpenses();
    this.loadBalances();
  }

  setView(mode: 'expenses' | 'balance') {
    this.viewMode = mode;
  }

  loadExpenses() {
    this.groupService.getExpenses(this.groupId).subscribe({
      next: (res: any) => {
        console.log("expense: ", res);
        this.expenses = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadBalances() {
    this.expenseService.getBalance(this.groupId).subscribe({
      next: (res) => {
        this.balances = res;
      },
      error: (err) => console.error(err)
    });
  }

  goToAddExpense() {
    this.focusService.clearFocus();
    this.router.navigate(['/groups', this.groupId,'add-expense']);
  }

  goToEditExpense(expenseId: number) {
    this.focusService.clearFocus();
    this.router.navigate(['/groups', this.groupId, 'expenses', expenseId, 'edit']);
  }

  generateInvite() {
    this.inviteService.generateInvite(this.groupId).subscribe({
      next: (res) => {
        const token = res.token;

        this.inviteLink = `http://localhost:8100/join/${token}`;
      },
      error: (err) => console.error(err)
    });
  }

  copyLink() {
    navigator.clipboard.writeText(this.inviteLink);
  }
}
