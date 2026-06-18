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

  splitMode: 'equal' | 'exact' | 'parts' = 'equal';

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
            selected: false,
            exactAmount: 0,
            parts: 1,
            locked: false
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

  onAmountEdit(participant: Participant) {
    participant.locked = true;
    participant.exactAmount = this.round2(participant.exactAmount || 0);
    this.rebalance();
  }

  rebalance() {
    const selected = this.participants.filter(p => p.selected);
    if (!this.amount || selected.length === 0) return;

    const total = Number(this.amount);

    // sum locked values
    const lockedSum = selected.filter(p => p.locked).reduce((sum, p) => sum + Number(p.exactAmount || 0), 0);

     // get unlocked participants
    const unlocked = selected.filter(p => !p.locked);
    if (unlocked.length === 0) return;

     // distribute remaining
    const remaining = total - lockedSum;
    const share = remaining / unlocked.length;

    let values = unlocked.map(() => this.round2(share));
    values = this.fixFloatingSplit(remaining, values);

    unlocked.forEach((p, i) => {p.exactAmount = values[i]});
  }

  onParticipantSelectionChange(participant: Participant) {
    if (!participant.selected) {
      participant.exactAmount = 0;
      participant.parts = 0;
      participant.locked = false;
    } else {
    // default values when selecting again
    participant.parts = participant.parts || 1;
  }

    this.rebalance();
  }
 
  onSplitModeChange() {
    const selected = this.participants.filter(p => p.selected);
    if (!this.amount || selected.length === 0) return;

    // RESET STATE FIRST
    selected.forEach(p => {p.locked = false; p.exactAmount = 0;});

    if (this.splitMode === 'parts') {
      selected.forEach(p => { p.parts = 1;});
      this.updatePartsSplit();
    }
    else{
      this.rebalance();
    }
    
  }

  calculateEqualSplit() {
    // filter selected participants
    const selected = this.participants.filter(p => p.selected);

    if (selected.length === 0 || !this.amount) return [];

    // compute share
    const share = Number(this.amount) / selected.length;

    let values = selected.map(() => this.round2(share));
    values = this.fixFloatingSplit(this.amount, values);
    console.log(values);

    // build payload
    return selected.map((p, i) => ({
      participantId: p.id,
      amount: values[i]
    }));
  }

  updatePartsSplit() {
    const selected = this.participants.filter(p => p.selected);

    if (!this.amount || selected.length === 0) return;

    const amount = Number(this.amount);

    const totalParts = selected.reduce((sum, p) => sum + (p.parts || 1), 0);
    if (totalParts === 0) return;

    const rawValues = selected.map(p => (amount * (p.parts || 1)) / totalParts);
    const corrected = this.fixFloatingSplit(amount, rawValues);


    selected.forEach((p, i) => {p.exactAmount = corrected[i];});
  }

  increaseParts(p: Participant) {
    if (!p.selected) return;

    p.parts = (p.parts || 1) + 1;
    this.updatePartsSplit();
  }

  decreaseParts(p: Participant) {
    if (!p.selected) return;

    p.parts = Math.max(1, (p.parts || 1) - 1);
    this.updatePartsSplit();
  }

  getPartShare(p: Participant): number {
    if (!p.selected) return 0;
    
    const selected = this.participants.filter(x => x.selected);
    const totalParts = selected.reduce((sum, x) => sum + (x.parts || 1), 0);

    if (!this.amount || totalParts === 0) return 0;

    console.log((this.amount * (p.parts || 1)) / totalParts);
    return (this.amount * (p.parts || 1)) / totalParts;
  }

  getExactTotal(): number {
    return this.participants.filter(p => p.selected).reduce(
        (sum, p) => sum + Number(p.exactAmount || 0), 0);
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

    if (!this.isSplitValid()) {
      console.error("Split invalid: total does not match amount");
      return;
    }

    let splits: { participantId: number; amount: number }[] = [];
    if(this.splitMode === 'equal'){
      splits = this.calculateEqualSplit();
    }
    else if(this.splitMode === 'exact'){
      splits = this.participants.filter(p => p.selected).map(p => ({
          participantId: p.id,
          amount: Number(p.exactAmount || 0)
        }));
    }
    else if (this.splitMode === 'parts') {
      splits = this.participants.filter(p => p.selected).map(p => ({
          participantId: p.id,
          amount: this.getPartShare(p)
        }));
    }
    
    const payload = {
      title: this.expenseName,
      amount: this.amount,
      payerId: this.payerId,
      splits: splits
    };

    console.log(payload);

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

  isSplitValid(): boolean {
    const totalSplit = this.participants.filter(p => p.selected).reduce((sum, p) => sum + Number(p.exactAmount || 0), 0);

    const total = Number(this.amount || 0);

    return Math.abs(totalSplit - total) < 0.01;
  }

  round2(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  fixFloatingSplit(amount: number, values: number[]) {
    const corrected = [...values];
    const sum = corrected.reduce((a,b) => a + b, 0);
    const diff = this.round2(amount - sum);

    corrected[corrected.length - 1] += diff;

    return corrected;
  }
}
