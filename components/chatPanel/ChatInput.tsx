"use client";
import React, { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className="sticky bg-transparent bottom-2 z-100">
        <form
          className="flex flex-row items-center justify-between px-3 py-2 mx-12 border-2 rounded-2xl border-gray-600 bg-balck text-slate-black xl:mx-18 2xl:mx-48"
          onSubmit={handleSubmit}
        >
          <input
            ref={inputRef}
            disabled={isLoading}
            value={input}
            placeholder="Send a message"
            className="w-[100%] h-[4vh] bg-black placeholder-slate-300 focus:outline-none"
            onChange={handleInputChange}
          />
          {!isLoading ? (
            <Button type="submit" className="bg-balck hover:bg-gray-800">
              <SendHorizontal size={28} color="#aeadad" strokeWidth={2.25} />
            </Button>
          ) : (
            <div className="flex flex-row items-center overflow-hidden h-10 w-10 mr-4">
              <Spinner />
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default ChatInput;
