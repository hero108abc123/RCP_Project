import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppMenuitem } from './app.menuitem';
import { PermissionConstants } from '@/shared/constants/permission.constants';
import { SharedService } from '@/service/shared.service';
import { IAppMenuItem } from '../model/app-menu-item.model';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<div class="flex flex-col h-full">
        <ul class="layout-menu flex-1">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul> 
    </div>`,
})
export class AppMenu {
    model: IAppMenuItem[] = [];
    _sharedService = inject(SharedService);

    ngOnInit() {
        this.model = [
            /*{
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            },*/
            {
                items: [
                    {
                        label: 'Quản lý Rạp chiếu phim',
                        visible: this._sharedService.isGranted(PermissionConstants.Menu),
                        items: [
                            {
                                label: 'Rạp chiếu phim',
                                visible: this._sharedService.isGranted(PermissionConstants.MenuRapChieuPhim),
                                heroIcon: 'heroFilm',
                                routerLink: ['/rcp-management/rcp']
                            },
                            {
                                label: 'Phim',
                                visible: this._sharedService.isGranted(PermissionConstants.MenuRapChieuPhim),
                                heroIcon: 'heroVideoCamera',
                                routerLink: ['/user-management/role']
                            }
                        ]
                    }
                ],
                visible: this._sharedService.isGranted(PermissionConstants.MenuUserManagement),
            },
            {
                items: [
                    {
                        label: 'Quản lý Tài khoản',
                        visible: this._sharedService.isGranted(PermissionConstants.MenuUserManagement),
                        items: [
                            {
                                label: 'Người dùng',
                                visible: this._sharedService.isGranted(PermissionConstants.MenuUserManagementUser),
                                heroIcon: 'heroUser',
                                routerLink: ['/user-management/user']
                            },
                            {
                                label: 'Vai trò',
                                visible: this._sharedService.isGranted(PermissionConstants.MenuUserManagementRole),
                                heroIcon: 'heroUserGroup',
                                routerLink: ['/user-management/role']
                            }
                        ]
                    }
                ],
                visible: this._sharedService.isGranted(PermissionConstants.MenuUserManagement),
            },
            
           
                    
        ];
  
    }
}
