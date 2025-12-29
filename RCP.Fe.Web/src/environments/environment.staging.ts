import { IEnvironment } from "@/shared/models/environment.models";

export const environment: IEnvironment = {
    production: false,
    baseUrl: 'http://10.20.0.108:8100',
    authGrantType: 'password',
    authClientId: 'client-web',
    authClientSecret: 'mBSQUHmZ4be5bQYfhwS7hjJZ2zFOCU2e',
    authScope: 'openid offline_access',
    appUrl: 'http://10.20.0.108:4200',
};
