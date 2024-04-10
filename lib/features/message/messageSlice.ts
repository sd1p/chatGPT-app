import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import axios from "axios";

interface Message {
  id: string;
  chatId: string;
  content: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MessageState {
  messages: Message[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MessageState = {
  messages: [],
  status: "idle",
  error: null,
};

export const fetchMessages = createAsyncThunk<Message[], string>(
  "messages/fetchMessages",
  async (chatId) => {
    const messages: Message[] = await axios
      .get(`/api/chatroom//${chatId}`)
      .then((res) => res.data);
    return messages;
  }
);

export const uploadMessage = createAsyncThunk(
  "messages/uploadMessage",
  async ({
    chatId,
    newMessage,
  }: {
    chatId: string;
    newMessage: { content: string; role: string };
  }) => {
    const response = await axios.post(`/api/chatroom/${chatId}`, newMessage);
    return response.data;
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    appendMessages: (state, action) => {
      state.messages.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const selectAllMessages = (state: RootState) => state.message.messages;
export const { appendMessages } = messageSlice.actions;

export default messageSlice.reducer;
