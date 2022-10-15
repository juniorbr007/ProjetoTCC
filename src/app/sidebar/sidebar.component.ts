import { AuthService } from 'app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/inicio',      title:  'Inicio',           icon:'nc-air-baloon',         class: '' },
    { path: '/dashboard',   title: 'Editais',           icon:'nc-paper',              class: '' },
    { path: '/arquivos',    title: 'Meus Arquivos',     icon:'nc-cloud-upload-94',    class: '' },
    { path: '/projetos',    title: 'Meus Projetos',     icon:'nc-briefcase-24',       class: '' },
    { path: '/user',        title: 'Perfil',            icon:'nc-single-02',          class: '' },
    
    // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {

    public menuItems: any[];
    userProfile;
    
    constructor(
        private autServ: AuthService,
        public router: Router
    ){
        this.userProfile = JSON.parse(localStorage.getItem('userProfile'));
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    logout(){
        this.autServ.logout().then(()=>{
            this.router.navigate(['/login']);
        });
        console.log('Logout 🏃🏾‍♂️​');
    }
}
