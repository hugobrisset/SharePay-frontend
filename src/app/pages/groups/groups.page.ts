import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FocusService } from 'src/app/core/focus.service';

import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonButton, CommonModule, FormsModule]
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
        console.log("groupes: ", res);
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
}
