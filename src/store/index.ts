import { configureStore } from "@reduxjs/toolkit";
import country from "@/store/apps/country/index";

export const store = configureStore({
  reducer: {
    country
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
