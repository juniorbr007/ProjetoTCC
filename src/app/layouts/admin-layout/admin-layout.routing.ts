import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { AddEditalComponent } from 'app/pages/add-edital/add-edital.component';
import { ArquivosComponent } from 'app/pages/arquivos/arquivos.component';
import { ProjetosComponent } from 'app/pages/projetos/projetos.component';
import { UsuariosComponent } from 'app/pages/usuarios/usuarios.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { TableComponent } from '../../pages/table/table.component';
import { Loading2Component } from '../loading2/loading.component';
import { LoadingComponent } from '../loading/loading.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserComponent } from '../../pages/user/user.component';
import { Routes } from '@angular/router';
import { InicioComponent } from 'app/pages/inicio/inicio.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'arquivos',       component: ArquivosComponent },
    { path: 'user',           component: UserComponent },
    { path: 'projetos',       component: ProjetosComponent },
    { path: 'add-edital',     component: AddEditalComponent },
    { path: 'usuarios',       component: UsuariosComponent },
    { path: 'inicio',         component: InicioComponent},
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'loading',        component: LoadingComponent },
    { path: 'loading2',       component: Loading2Component }
];
