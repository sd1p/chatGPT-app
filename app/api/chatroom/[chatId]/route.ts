import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { content, role } = await request.json();
  const chatId = request.nextUrl.pathname.split("/")[3];

  try {
    const chat = await prisma.message.create({
      data: {
        content: content,
        chatId: chatId,
        role: role,
      },
    });
    return Response.json({ ...chat });
  } catch (error: any) {
    return Response.json({ error: error?.message });
  }
}

export async function GET(request: NextRequest) {
  try {
    const chatId = request.nextUrl.pathname.split("/")[3];

    const chat = await prisma.message.findMany({
      where: { chatId: chatId },
      orderBy: { createdAt: "asc" },
    });
    return Response.json(chat);
  } catch (error: any) {
    return Response.json({ error: error?.message });
  }
}
