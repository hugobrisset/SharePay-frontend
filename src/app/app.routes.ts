import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then( m => m.AuthPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'groups',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/groups/groups.page').then( m => m.GroupsPage)
  },
  {
    path: 'groups/create-group',
    loadComponent: () => import('./pages/create-group/create-group.page').then( m => m.CreateGroupPage)
  },
  {
    path: 'groups/:id/create-link',
    loadComponent: () => import('./pages/create-link/create-link.page').then( m => m.CreateLinkPage)
  },
  {
    path: 'groups/:id',
    loadComponent: () => import('./pages/group-details/group-details.page').then( m => m.GroupDetailsPage)
  },
  {
    path: 'groups/:groupId/add-expense',
    loadComponent: () => import('./pages/add-expense/add-expense.page').then( m => m.AddExpensePage)
  },
  {
    path: 'join/:token',
    loadComponent: () => import('./pages/join-goup/join-goup.page').then( m => m.JoinGoupPage)
  },
  {
    path: 'groups/:groupId/expenses/:expenseId/edit',
    loadComponent: () => import('./pages/edit-expense/edit-expense.page').then( m => m.EditExpensePage)
  },

];
