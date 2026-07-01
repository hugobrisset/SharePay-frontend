import { Component, Input } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

export interface HeaderAction {
  label: string;
  icon?: string;
  action: () => void;
}

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  imports: [IonicModule],
})
export class AppHeaderComponent {

  @Input() actions: HeaderAction[] = [];

  @Input() title = '';
  @Input() showBack = true;
  @Input() defaultHref = '/home';
  
  constructor(
    private navCtrl: NavController,
    private popoverCtrl: PopoverController
  ) {}

  goBack() {
    this.navCtrl.navigateBack(this.defaultHref);
  }

  async runAction(action: HeaderAction) {
    await this.popoverCtrl.dismiss(); 
    action.action();
  }
}
