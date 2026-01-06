import { PermissionConstants } from "@/shared/constants/permission.constants";
import { Routes } from "@angular/router";
import { Kho } from "./kho/kho";
import { permissionGuard } from "@/shared/guard/permission-guard";
import { Hang } from "./hang/hang";
import { ChiTietKho } from "./kho/chi-tiet/chi-tiet";
import { ThongKeKho } from "./thong-ke/thong-ke";

export default [
    { path: 'kho', data: { breadcrumb: 'kho', permission: PermissionConstants.MenuKho }, component: Kho, canActivate: [permissionGuard] },
    { path: 'hang', data: { breadcrumb: 'hang', permission: PermissionConstants.MenuKho }, component: Hang, canActivate: [permissionGuard] },
    { path: 'kho/chi-tiet', data: { breadcrumb: 'kho/chi-tiet', permission: PermissionConstants.MenuKho }, component: ChiTietKho, canActivate: [permissionGuard] },
    { path: 'thong-ke', data: { breadcrumb: 'thong-ke', permission: PermissionConstants.MenuKho }, component: ThongKeKho, canActivate: [permissionGuard] },
] as Routes