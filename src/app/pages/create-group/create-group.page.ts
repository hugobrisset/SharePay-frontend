import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FocusService } from 'src/app/core/focus.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class CreateGroupPage implements OnInit {

  groupName: string = '';
  participants: string[] = [''];

  
  constructor(
    private http: HttpClient,
    private router: Router,
    private focusService: FocusService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
  }

  addParticipantField() {
    this.participants.push('');
  }

  removeParticipant(index: number) {
    this.participants.splice(index, 1);

    if (this.participants.length === 0) {
      this.participants.push('');
    }
  }


  createGroup(){

    const cleanParticipants = this.participants.map(p => p.trim()).filter(p => p.length > 0);

    const data = {
      name: this.groupName,
      participants: cleanParticipants
    };

    this.groupService.createGroup(data).subscribe({
      next: (res) => {
        this.focusService.clearFocus();
        this.router.navigate(['/groups', res.id]);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
