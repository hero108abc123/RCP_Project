import { PermissionConstants } from "@/shared/constants/permission.constants";
import { Mon } from "./mon/mon";
import { permissionGuard } from "@/shared/guard/permission-guard";
import { Routes } from "@angular/router";
import { Menu } from "./menu/menu";
import { ChiTietMenu } from "./menu/chi-tiet/chi-tiet";


export default [
  { path: 'mon', data: { breadcrumb: 'mon', permission: PermissionConstants.MenuMenu }, component: Mon, canActivate: [permissionGuard] },
  { path: 'menu', data: { breadcrumb: 'menu', permission: PermissionConstants.MenuMenu }, component: Menu, canActivate: [permissionGuard] },
  { path: 'menu/chi-tiet', data: { breadcrumb: 'menu/chi-tiet', permission: PermissionConstants.MenuMenu }, component: ChiTietMenu, canActivate: [permissionGuard] },
 
] as Routes