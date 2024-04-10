import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
    });

    const stream = OpenAIStream(response, {
      onStart: async () => {
        await savePromptToDatabase(messages[messages.length - 1].content);
      },
      onToken: async (token: string) => {
        // console.log(token);
      },
      onCompletion: async (completion: string) => {
        await saveCompletionToDatabase(completion);
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      throw error;
    }
  }
}

const savePromptToDatabase = async (prompt: any) => {
  await prisma.message.create({
    data: {
      content: prompt,
      role: "user",
      chatId: "661593a03d5c4c4c316a1517",
    },
  });
};

const saveCompletionToDatabase = async (completion: string) => {
  await prisma.message.create({
    data: {
      content: completion,
      role: "assistant",
      chatId: "661593a03d5c4c4c316a1517",
    },
  });
};
