import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FocusService } from 'src/app/core/focus.service';

  interface Group{
    id: number;
    name: string;
    created_at?: string;
  }

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
    private focusService: FocusService
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

    console.log("DATA SENT:", data);

    this.http.post<Group>('http://localhost:3000/groups/createGroup', data).subscribe({
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
