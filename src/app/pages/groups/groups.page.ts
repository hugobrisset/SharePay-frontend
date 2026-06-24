import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FocusService } from 'src/app/core/focus.service';

import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class GroupsPage implements OnInit {

  groups: any[] = [];

  constructor(
    private groupService: GroupService,
    private router: Router,
    private focusService: FocusService)
    {}

  ngOnInit() {
    this.groupService.getUserGroups().subscribe({
      next: (res: any) => {
        this.groups = res;
      },

      error: (err: any) => {
        console.error("Erreur: ", err);
      }
    })
  }

  openGroup(groupId: number) {
    this.focusService.clearFocus();
    this.router.navigate(['/groups', groupId]);
  }

  goToCreateGroup(){
    this.focusService.clearFocus();
    this.router.navigate(['/groups/create-group']);
  }
}
