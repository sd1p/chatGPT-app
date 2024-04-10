"use client";
import React, { use, useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { useChat } from "ai/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  selectAllMessages,
} from "@/lib/features/message/messageSlice";
import { AppDispatch } from "@/lib/store";

const ChatPanel = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const dispatch = useDispatch<AppDispatch>();
  const storedMessages = useSelector(selectAllMessages);

  useEffect(() => {
    dispatch(fetchMessages("661593a03d5c4c4c316a1517")).then(() =>
      scrollToBottom()
    );
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages[messages.length - 1]?.content]);

  return (
    <>
      <div className="h-[80vh] overflow-y-scroll px-6 no-scrollbar">
        {storedMessages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
        <div className="pb-10" ref={messagesEndRef} />
      </div>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
};

export default ChatPanel;
