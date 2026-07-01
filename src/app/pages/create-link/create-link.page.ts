import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { InviteService } from 'src/app/services/invite.service';

import {AppHeaderComponent } from 'src/app/components/app-header/app-header.component';

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.page.html',
  styleUrls: ['./create-link.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AppHeaderComponent]
})
export class CreateLinkPage {

  inviteLink = '';
  groupId!: number;
  copied = false;

  constructor(
    private inviteService: InviteService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(){
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
  }

  generateInvite() {
    this.inviteService.generateInvite(this.groupId).subscribe({
      next: (res) => {
        const token = res.token;

        this.inviteLink = `http://localhost:8100/join/${token}`;
      },
      error: (err) => console.error(err)
    });
  }

  copyLink() {
    navigator.clipboard.writeText(this.inviteLink);

    this.copied = true;

    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }

}
