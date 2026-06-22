import { Component, Input } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  imports: [IonicModule],
})
export class AppHeaderComponent {

  @Input() title = '';
  @Input() showBack = true;
  @Input() defaultHref = '/home';
  
  constructor(private navCtrl: NavController) {}

  goBack() {
    this.navCtrl.back();
  }

}
