import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExpenseService } from 'src/app/services/expense.service';
import { Router } from '@angular/router';
import { FocusService } from 'src/app/core/focus.service';
import { GroupService, Participant } from 'src/app/services/group.service';
import { AuthService } from 'src/app/services/auth.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AddExpensePage implements OnInit {

  currentUserId!: number;
  groupId!: number;

  expenseName: string = '';
  amount: number | null = null;

  participants: Participant[] = [];
  payerId: number | null = null;
  selectedParticipants: number[] = [];

  splitMode: 'equal' = 'equal';

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private router: Router,
    private focusService: FocusService,
    private groupService: GroupService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.currentUserId = user?.id;

    this.groupId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadParticipants();
  }

  loadParticipants() {
    this.groupService.getParticipants(this.groupId).subscribe({
        next: (res) => {
          this.participants = res.map(p => ({
            ...p,
            selected: false
          }));

          
          // default payer = current user participant if exists
           const me = this.participants.find(
              p => p.user_id === this.currentUserId
            );

            if (me) {
              this.payerId = me.id;
            }

        },
        error: (err) => console.error(err)
      });
  }

  calculateEqualSplit() {
    // filter selected participants
    const selected = this.participants.filter(p => p.selected);

    if (selected.length === 0 || !this.amount) return [];

    // compute share
    const share = Number(this.amount) / selected.length;

    // build payload
    return selected.map(p => ({
      participantId: p.id,
      amount: share
    }));
  }

  getParticipantShare(participantId: number): number {
    const selected = this.participants.filter(p => p.selected);

    if (!this.amount || selected.length === 0) {
      return 0;
    }

    const share = this.amount / selected.length;

    const participant = this.participants.find(
      p => p.id === participantId
    );

    if (!participant?.selected) {
      return 0;
    }

    return share;
  }

  submit() {
     if (!this.expenseName || !this.amount || !this.payerId) return;

      const splits = this.splitMode === 'equal' ? this.calculateEqualSplit() : [];

      const payload = {
        title: this.expenseName,
        amount: this.amount,
        payerId: this.payerId,
        splits: splits
      };

     this.expenseService.createExpense(this.groupId, payload).subscribe({
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
