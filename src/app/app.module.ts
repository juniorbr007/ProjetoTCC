import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { environment } from '../environments/environment';
import { ArquivosComponent } from './pages/arquivos/arquivos.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt-BR');
import { CommonModule } from '@angular/common';
import { AuthService } from "./services/auth/auth.service";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { ApiService } from "./services/api/api.service";
import { UserService } from "./services/user/user.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProjetosComponent } from './pages/projetos/projetos.component';
import { AddEditalComponent } from './pages/add-edital/add-edital.component';
import { InicioComponent } from "./pages/inicio/inicio.component";
import { MatPaginatorModule } from '@angular/material/paginator';
import { QuillModule } from 'ngx-quill'


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ArquivosComponent,
    ProjetosComponent,
    AddEditalComponent,
    InicioComponent,

  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: false
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    QuillModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    AngularFireAuth,
    AngularFireAuthGuard,
    AuthService,
    UserService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
