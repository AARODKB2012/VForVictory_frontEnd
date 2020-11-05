import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { ListFamilyComponent } from './list-family/list-family.component';
import { ListVolunteersComponent } from './list-volunteers/list-volunteers.component';
import { NewFamilyComponent } from './new-family/new-family.component';
import { NewVolunteerComponent } from './new-volunteer/new-volunteer.component';
import { AuthGuard } from './_guards/index';

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
                path: 'volunteers/new', component: NewVolunteerComponent, canActivate: [AuthGuard]
            },
            {
                path: 'volunteers/view', component: NewVolunteerComponent, canActivate: [AuthGuard]
            },
            {
                path: 'volunteers/edit', component: NewVolunteerComponent, canActivate: [AuthGuard]
            },
            {
                path: 'families', component: ListFamilyComponent, canActivate: [AuthGuard]
            },
            {
                path: 'families/new', component: NewFamilyComponent, canActivate: [AuthGuard]
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
        }
];
