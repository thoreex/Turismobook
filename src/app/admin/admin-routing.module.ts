import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { ManageCentrosComponent } from './manage-centros/manage-centros.component';
import { ManageEditoresComponent } from './manage-editores/manage-editores.component';
import { ManageNoticiasComponent } from './manage-noticias/manage-noticias.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../auth/auth.guard';
import { ListNoticiasComponent } from './list-noticias/list-noticias.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'manage-centros', component: ManageCentrosComponent, data: { roles: ['Editor', 'Admin'] } },
          { path: 'manage-editores', component: ManageEditoresComponent, data: { roles: ['Admin'] } },
          {
            path: 'noticias', component: ListNoticiasComponent, data: { roles: ['Admin'] }, children: [
              { path: ':id', component: ManageNoticiasComponent }
            ]
          },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
