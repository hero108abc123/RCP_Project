import { PermissionConstants } from "@/shared/constants/permission.constants";
import { Routes } from "@angular/router";
import { RCP } from "./rcp/rcp";
import { permissionGuard } from "@/shared/guard/permission-guard";
import { Room } from "./room/room";

import { Ghe } from "./ghe/ghe";

export default [
  { path: 'rcp', data: { breadcrumb: 'rcp', permission: PermissionConstants.MenuRapChieuPhim }, component: RCP, canActivate: [permissionGuard] },
  { path: 'room', data: { breadcrumb: 'room', permission: PermissionConstants.MenuRapChieuPhim }, component: Room, canActivate: [permissionGuard] },
  
  { path: 'ghe', data: { breadcrumb: 'ghe', permission: PermissionConstants.MenuRapChieuPhim }, component: Ghe, canActivate: [permissionGuard] },
] as Routes
