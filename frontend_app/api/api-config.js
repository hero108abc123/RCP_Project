export const apiConfig = {
    baseUrl: "http://10.0.2.2:5025",

  endpoints: {
    register: "/api/app/user/register",
    token: "/connect/token",
  },
};

// import { Platform } from 'react-native';
// import * as Device from 'expo-device';

// const isEmulator = Platform.OS === 'android' && !Device.isDevice;

// export const apiConfig = {
//   baseUrl: isEmulator
//     ? "http://10.0.2.2:5025"
//     : "http://192.168.100.245:5025",

//   endpoints: {
//     register: "/api/app/user/register",
//     token: "/connect/token",
//   },
// };


// // baseUrl: "http://10.0.2.2:5025",