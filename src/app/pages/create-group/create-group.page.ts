import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { FocusService } from 'src/app/core/focus.service';
import { GroupService } from 'src/app/services/group.service';
import { AuthService } from 'src/app/services/auth.service';

import {AppHeaderComponent } from 'src/app/components/app-header/app-header.component';


@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, AppHeaderComponent]
})
export class CreateGroupPage implements OnInit {

  groupName: string = '';
  participants: string[] = [''];
  creatorUsername: string = '';
  errorMessage: string = '';

  
  constructor(
    private router: Router,
    private focusService: FocusService,
    private groupService: GroupService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.creatorUsername = this.authService.getUsername();
    this.participants = [this.creatorUsername, ''];
  }

  addParticipantField() {
    this.participants.push('');
  }

  removeParticipant(index: number) {
    if (index === 0) {
      return; // creator cannot be removed
    }

    this.participants.splice(index, 1);

    if (this.participants.length === 0) {
      this.participants.push('');
    }
  }


  createGroup(){

    const data = {
      name: this.groupName,
      participants: this.participants
    };

    console.log(data);

    this.groupService.createGroup(data).subscribe({
      next: (res) => {
        this.errorMessage = '';

        this.focusService.clearFocus();
        this.router.navigate(['/groups', res.id]);
      },
      error: (err) => {
        this.errorMessage = err?.error?.error || "An unexpected error occurred";
      }
    });
  }

  isFormValid(): boolean {
    const hasValidGroupName = this.groupName?.trim().length > 0;

    const hasEmptyParticipant = this.participants.some(
      p => !p || p.trim().length === 0
    );

    return hasValidGroupName && !hasEmptyParticipant;
  }
}
