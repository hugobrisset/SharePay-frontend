import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { FocusService } from 'src/app/core/focus.service';
import { GroupService } from 'src/app/services/group.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { AuthService } from 'src/app/services/auth.service';

import { AppHeaderComponent, HeaderAction } from 'src/app/components/app-header/app-header.component';
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

  currentParticipantId!: number;

  groupId!: number;

  expenses: any[] = [];
  balances: any[] = [];
  settlements: any[] = [];

  showAllSettlements = false;

  viewMode: 'expenses' | 'balance' = 'expenses';

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private focusService: FocusService,
    private groupService: GroupService,
    private expenseService: ExpenseService,
    private authService: AuthService
  ) {}

  headerActions: HeaderAction[] = [
    {
      label: 'Partager',
      icon: 'share-social-outline',
      action: () => this.goToShareGroup()
    },
    {
      label: 'Modifier',
      icon: 'create-outline',
      action: () => this.editGroup()
    }
  ];

  editGroup() {
    console.log("edit group");
  }

  ngOnInit() {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));

    const user = this.authService.getUser();

    this.groupService.getParticipantsId(user?.id).subscribe({
      next: (res) => {
        this.currentParticipantId = res.participantId;
      },
      error: (err) => console.error(err)
    });
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
        this.balances = res.balances;
        this.settlements = res.settlements;
      },
      error: (err) => console.error(err)
    });
  }

  get filteredSettlements() {
    if (!this.currentParticipantId) return [];
    
    if (this.showAllSettlements) {
      return this.settlements;
    }

    return this.settlements.filter(s =>
      s.from.id === this.currentParticipantId ||
      s.to.id === this.currentParticipantId
    );
  }

  goToAddExpense() {
    this.focusService.clearFocus();
    this.router.navigate(['/groups', this.groupId,'add-expense']);
  }

  goToEditExpense(expenseId: number) {
    this.focusService.clearFocus();
    this.router.navigate(['/groups', this.groupId, 'expenses', expenseId, 'edit']);
  }

  goToShareGroup() {
    this.focusService.clearFocus();
    this.router.navigate(['/groups', this.groupId,'create-link']);
  }
}
