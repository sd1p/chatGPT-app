import prisma from "@/lib/db";

export async function POST(request: Request) {
  const { title } = await request.json();

  try {
    const chat = await prisma.chat.create({
      data: {
        title,
      },
    });
    return Response.json({ ...chat });
  } catch (error: any) {
    return Response.json({ error: error?.message });
  }
}

export async function GET(request: Request) {
  try {
    const chats = await prisma.chat.findMany({});
    return Response.json(chats);
  } catch (error: any) {
    return Response.json({ error: error?.message });
  }
}
