import { IEnvironment } from "@/shared/models/environment.models";

export const environment: IEnvironment = {
    production: true,
    baseUrl: 'http://api.yna.io.vn',
    authGrantType: 'password',
    authClientId: 'client-web',
    authClientSecret: 'mBSQUHmZ4be5bQYfhwS7hjJZ2zFOCU2e',
    authScope: 'openid offline_access',
    appUrl: 'http://app.yna.io.vn',
};