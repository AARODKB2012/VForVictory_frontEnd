import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { ListBusinessComponent } from './list-business/list-business.component';
import { ListFamilyComponent } from './list-family/list-family.component';
import { ListVolunteersComponent } from './list-volunteers/list-volunteers.component';
import { EditServicesComponent } from './edit-services/edit-services.component';
import { ActiveServicesComponent } from './active-services/active-services.component';
import { ListServicesComponent } from './list-services/list-services.component';
import { RequestServiceLoginComponent } from './request-service-login/request-service-login.component'
import { RequestServiceComponent } from './request-service/request-service.component'
import { NewBusinessComponent } from './new-business/new-business.component';
import { NewFamilyComponent } from './new-family/new-family.component';
import { NewVolunteerComponent } from './new-volunteer/new-volunteer.component';
import { UserComponent } from './userpage/user.component';
import { LockComponent } from './pages/lock/lock.component';
import { AuthGuard } from './_guards/index';
import { FamilyApplicationComponent } from './family-application/family-application.component';
import { ActiveFamilyComponent } from './active-family/active-family.component';

export const AppRoutes: Routes = [{
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        component: AdminLayoutComponent,
        children: [{
                path: '',
                loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]
            },
            {
                path: 'volunteers', component: ListVolunteersComponent, canActivate: [AuthGuard]
            },
            {
                path: 'volunteers/view', component: NewVolunteerComponent, canActivate: [AuthGuard]
            },
            {
                path: 'volunteers/new', component: NewVolunteerComponent, canActivate: [AuthGuard]
            },
            {
                path: 'volunteers/profile', component: UserComponent, canActivate: [AuthGuard]
            },
            {
                path: 'family', component: ListFamilyComponent, canActivate: [AuthGuard]
            },
            {
                path: 'family/new', component: NewFamilyComponent, canActivate: [AuthGuard]
            },
            {
                path: 'volunteers/edit', component: NewVolunteerComponent, canActivate: [AuthGuard]
            },
            {
                path: 'business', component: ListBusinessComponent, canActivate: [AuthGuard]
            },
            {
                path: 'business/new', component: NewBusinessComponent, canActivate: [AuthGuard]
            },
            {
                path: 'business/edit', component: NewBusinessComponent, canActivate: [AuthGuard]
            },
            {
                path: 'business/view', component: NewBusinessComponent, canActivate: [AuthGuard]
            },
            {
                path: 'services', component: ListServicesComponent, canActivate: [AuthGuard]
            },
            {
                path: 'services/edit', component: EditServicesComponent, canActivate: [AuthGuard]
            },
            {
                path: 'services/active', component: ActiveServicesComponent, canActivate: [AuthGuard]
            },
            {
                path: 'family/active', component: ActiveFamilyComponent, canActivate: [AuthGuard]
            }
            /* {
                path: 'components',
                loadChildren: './components/components.module#ComponentsModule'
            },
            {
                path: 'forms',
                loadChildren: './forms/forms.module#Forms'
            },
            {
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule'
            },
            {
                path: 'maps',
                loadChildren: './maps/maps.module#MapsModule'
            },
            {
                path: 'charts',
                loadChildren: './charts/charts.module#ChartsModule'
            },
            {
                path: 'calendar',
                loadChildren: './calendar/calendar.module#CalendarModule'
            },
            {
                path: '',
                loadChildren: './userpage/user.module#UserModule'
            },
            {
                path: '',
                loadChildren: './timeline/timeline.module#TimelineModule'
            },
            {
                path: '',
                loadChildren: './widgets/widgets.module#WidgetsModule'
            } */
        ]
        },
        {
            path: '',
            component: AuthLayoutComponent,
            children: [{
                path: 'pages',
                loadChildren: './pages/pages.module#PagesModule'
            }]
        },
        {
            path: 'request/login', component: RequestServiceLoginComponent
        },
        {
            path: 'request', component: RequestServiceComponent
        },
        {
            path: 'family-application', component: FamilyApplicationComponent
        }
];
