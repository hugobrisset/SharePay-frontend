import { Component, Input } from '@angular/core';
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

  getColor(balance: number): string {
    if (balance > 0) return 'success';
    if (balance < 0) return 'danger';
    return 'medium';
  }

}
