import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router'
import { InviteService } from '../../services/invite.service';
import { FocusService } from 'src/app/core/focus.service';


@Component({
  selector: 'app-join-goup',
  templateUrl: './join-goup.page.html',
  styleUrls: ['./join-goup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class JoinGoupPage implements OnInit {

  token = '';
  groupName = '';
  participants: any[] = [];

  selectedParticipantId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inviteService: InviteService,
    private focusService: FocusService
  ) {}

  ngOnInit() {

    this.token = this.route.snapshot.paramMap.get('token')!;

    this.loadInvite();
  }

  loadInvite() {
    this.inviteService.getInviteInfo(this.token).subscribe(data => {
      console.log("PARTICIPANTS:", data.participants);

      this.groupName = data.groupName;
      this.participants = data.participants;
    });
    
  } 

  joinGroup() {
    if (!this.selectedParticipantId) return;

    this.inviteService.joinGroup(this.token, this.selectedParticipantId).subscribe({
        next: (res) => {

          this.focusService.clearFocus();
          this.router.navigate(['/groups', res.groupId]);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

}
