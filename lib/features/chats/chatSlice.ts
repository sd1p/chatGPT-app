import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import prisma from "@/lib/db";
import axios from "axios";

interface Message {
  id: string;
  chatsId: string;
  content: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Chat {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatsState {
  chats: Chat[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchChats = createAsyncThunk<Chat[], void>(
  "chats/fetchChats",
  async () => {
    const chats: Chat[] = await axios
      .get("/api/chatroom")
      .then((res) => res.data);
    return chats;
  }
);

const initialState: ChatsState = {
  chats: [],
  status: "idle",
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const selectAllChats = (state: RootState) => state.chat.chats;

export default chatSlice.reducer;
