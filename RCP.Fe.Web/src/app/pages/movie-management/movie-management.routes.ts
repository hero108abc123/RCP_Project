import { PermissionConstants } from "@/shared/constants/permission.constants";
import { MovieManagement } from "./movie-management";
import { permissionGuard } from "@/shared/guard/permission-guard";
import { Routes } from "@angular/router";

export default [
  { path: 'movie-management', data: { breadcrumb: 'movie-management', permission: PermissionConstants.MenuMovie }, component: MovieManagement, canActivate: [permissionGuard] },
 
] as Routes