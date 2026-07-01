import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-balance-list',
  templateUrl: './balance-list.component.html',
  styleUrls: ['./balance-list.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class BalanceListComponent {

  @Input() balances: any[] = [];
  @Input() settlements: any[] = [];

  @Input() currentParticipantId!: number;

  @Input() isGlobalView = false;
  @Output() toggleAll = new EventEmitter<void>();

  getColor(balance: number): string {
    if (balance > 0) return 'success';
    if (balance < 0) return 'danger';
    return 'medium';
  }

  showAll() {
    this.toggleAll.emit();
  }

}
