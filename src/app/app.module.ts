import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }   from './app.component';

import { SidebarModule } from './sidebar/sidebar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './_guards/index';
import { ListVolunteersComponent } from './list-volunteers/list-volunteers.component';
import { NewVolunteerComponent } from './new-volunteer/new-volunteer.component';
import { ListFamilyComponent } from './list-family/list-family.component';
import { NewFamilyComponent } from './new-family/new-family.component';
import { ListBusinessComponent } from './list-business/list-business.component';
import { ListServicesComponent } from './list-services/list-services.component';
import { YesNoPipe } from './yesno.pipe';
import { YesNoActivePipe } from './yesnoactive.pipe';
import { RequestServiceComponent } from './request-service/request-service.component';
import { EditServicesComponent } from './edit-services/edit-services.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { UserComponent } from './userpage/user.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { UserComponent } from './userpage/user.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ActiveServicesComponent } from './active-services/active-services.component';



@NgModule({
    imports:      [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes,{
          useHash: true
        }),
        NgbModule,
        HttpModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        ClipboardModule,
        FixedPluginModule,
        HttpClientModule,
        CommonModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        ListVolunteersComponent,
        NewVolunteerComponent,
        ListFamilyComponent,
        NewFamilyComponent,
        ListBusinessComponent,
        ListServicesComponent,
        YesNoPipe,
        YesNoActivePipe,
        RequestServiceComponent,
<<<<<<< HEAD
        EditServicesComponent,
        UserComponent
=======
<<<<<<< HEAD
        EditServicesComponent,
        UserComponent,
        ActiveServicesComponent
=======
        EditServicesComponent
>>>>>>> 030d892982257ae390b5eb53aa07cbce9df585ec
>>>>>>> origin/service_record
    ],
    providers: [AuthGuard],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
