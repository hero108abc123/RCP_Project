import { PermissionConstants } from "@/shared/constants/permission.constants";
import { LichChieu } from "./lich-chieu/lich-chieu";
import { permissionGuard } from "@/shared/guard/permission-guard";
import { Routes } from "@angular/router";

export default [
  { path: 'lich-chieu', data: { breadcrumb: 'lich-chieu', permission: PermissionConstants.MenuLichChieu }, component: LichChieu, canActivate: [permissionGuard] },
 
] as Routes