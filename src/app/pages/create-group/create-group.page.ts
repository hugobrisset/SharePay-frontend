import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class CreateGroupPage implements OnInit {

  groupName: string = '';

  constructor() { }

  ngOnInit() {
  }

  submit(){
    console.log(`create new groupe: ${this.groupName}`);
  }

}
