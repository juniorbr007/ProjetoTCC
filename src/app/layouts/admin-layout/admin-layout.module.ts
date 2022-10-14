import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { SwitchToggleComponent } from 'app/switch-toggle/switch-toggle.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UsuariosComponent } from 'app/pages/usuarios/usuarios.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { TableComponent } from '../../pages/table/table.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { Loading2Component } from '../loading2/loading.component';
import { LoadingComponent } from './../loading/loading.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserComponent } from '../../pages/user/user.component';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    MapsComponent,
    TableComponent,
    IconsComponent,
    UpgradeComponent,
    UsuariosComponent,
    TypographyComponent,
    NotificationsComponent,
    SwitchToggleComponent,
    Loading2Component,
    LoadingComponent,
  ]
})

export class AdminLayoutModule {}
