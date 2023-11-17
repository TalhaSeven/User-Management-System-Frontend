import { configureStore } from "@reduxjs/toolkit";
import country from "@/store/apps/country/index";
import user from "@/store/apps/user/index";
import address from "@/store/apps/address/index";

export const store = configureStore({
  reducer: {
    country,
    user,
    address
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
