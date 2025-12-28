import { PermissionConstants } from "@/shared/constants/permission.constants";
import { Routes } from "@angular/router";
import { RCP } from "./rcp/rcp";
import { permissionGuard } from "@/shared/guard/permission-guard";
import { Room } from "./room/room";

export default [
  { path: 'rcp', data: { breadcrumb: 'rcp', permission: PermissionConstants.MenuRapChieuPhim }, component: RCP, canActivate: [permissionGuard] },
  { path: 'room', data: { breadcrumb: 'room', permission: PermissionConstants.MenuRapChieuPhim }, component: Room, canActivate: [permissionGuard] },
] as Routes