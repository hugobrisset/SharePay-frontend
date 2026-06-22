import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { GroupService } from '../services/group.service';
import { FocusService } from '../core/focus.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class HomePage {

  groups: any[] = [];

  constructor(
    private authService: AuthService, 
    private router: Router,
    private focusService: FocusService,
    private groupService: GroupService,
  ){}

  ngOnInit() {
    this.groups = [];
    this.loadGroups();
  }

  ionViewWillEnter() {
    this.groups = [];
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getUserGroups().subscribe({
      next: (res: any) => this.groups = res,
      error: (err: any) => console.error(err)
    });
  }

  get username() {
    return this.authService.getUsername();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.groups = [];
  }

  goToLogin() {
    this.focusService.clearFocus();
    this.router.navigate(['/auth']);
  }

    openGroup(groupId: number) {
    this.focusService.clearFocus();
    this.router.navigate(['/groups', groupId]);
  }

  goToCreateGroup() {
    this.focusService.clearFocus();
    this.router.navigate(['/groups/create-group']);
  }
}
