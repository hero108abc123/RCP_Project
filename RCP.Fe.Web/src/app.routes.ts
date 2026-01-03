import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { authGuard } from '@/shared/guard/auth-guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'rcp-management/rcp', pathMatch: 'full' },

            { path: 'user-management', loadChildren: () => import('./app/pages/user-management/user-management.routes') },
            //{ path: 'trao-bang', loadChildren: () => import('./app/pages/trao-bang/trao-bang.routes') },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'rcp-management', loadChildren: () => import('./app/pages/rcp-management/rcp-management.routes') },
            { path: 'gia-ve', loadChildren: () => import('./app/pages/gia-ve/gia-ve.routes') },
            { path: 'lich-chieu', loadChildren: () => import('./app/pages/lich-chieu/lich-chieu.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },

    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
