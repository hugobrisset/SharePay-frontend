import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FocusService } from 'src/app/core/focus.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.page.html',
  styleUrls: ['./group-details.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class GroupDetailsPage implements OnInit {

  groupId!: number;
  expenses: any[] = [];
  inviteLink = '';

  private baseURL = 'http://localhost:3000/groups';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private focusService: FocusService,
  ) {}

  ngOnInit() {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ionViewWillEnter() {
    this.loadExpenses();
  }

  loadExpenses() {
    this.http.get(`${this.baseURL}/${this.groupId}/getAllExpense`).subscribe({
      next: (res: any) => {
        this.expenses = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  goToAddExpense() {
    this.focusService.clearFocus();
    this.router.navigate(['/groups', this.groupId,'add-expense']);
  }

  generateInvite(groupId: number) {
    this.http.post<any>(`http://localhost:3000/groups/${groupId}/invite`,{}).subscribe({
      next: (res) => {
        console.log(res);

        this.inviteLink = res.link;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  copyLink() {
    navigator.clipboard.writeText(this.inviteLink);
  }
}
