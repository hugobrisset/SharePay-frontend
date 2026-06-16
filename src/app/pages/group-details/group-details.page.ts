import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FocusService } from 'src/app/core/focus.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.page.html',
  styleUrls: ['./group-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,IonList, IonItem, IonFab, IonFabButton, CommonModule, FormsModule]
})
export class GroupDetailsPage implements OnInit {

  groupId!: number;
  expenses: any[] = [];

  private baseURL = 'http://localhost:3000/groups';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private focusService: FocusService)
    {}

  ngOnInit() {
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadExpenses();
  }

  loadExpenses() {
    this.http.get(`${this.baseURL}/group/${this.groupId}/`).subscribe({
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
}
