import { PermissionConstants } from "@/shared/constants/permission.constants";
import { Routes } from "@angular/router";
import { GiaVe } from "./gia-ve/gia-ve";
import { permissionGuard } from "@/shared/guard/permission-guard";

export default [
  { path: 'gia-ve', data: { breadcrumb: 'gia-ve', permission: PermissionConstants.MenuGiaVe }, component: GiaVe, canActivate: [permissionGuard] },
 
] as Routes