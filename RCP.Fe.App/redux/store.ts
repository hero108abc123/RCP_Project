import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import userReducer from "./slices/userSlice";
import movieReducer from "./slices/movieSlice";
// ✅ BƯỚC 1: Import roomReducer
import roomReducer from "./slices/roomSlice";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: AsyncStorage,
    // Chỉ lưu user và các project config, không nên lưu movies/room để tránh data cũ
    whitelist: ["user", "configProject"],
  },
  combineReducers({
    user: userReducer,
    movies: movieReducer,
    // ✅ BƯỚC 2: Đăng ký room reducer với key là 'room'
    room: roomReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
