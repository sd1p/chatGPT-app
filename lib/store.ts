import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "@/lib/features/chats/chatSlice";
import messageReducer from "@/lib/features/message/messageSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      chat: chatReducer,
      message: messageReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
