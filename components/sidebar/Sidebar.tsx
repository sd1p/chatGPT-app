import { MessageCirclePlus, PenLine } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, selectAllChats } from "@/lib/features/chats/chatSlice";
import { useEffect } from "react";
import { AppDispatch } from "@/lib/store";

const logoFont = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chats = useSelector(selectAllChats);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="flex h-screen flex-col justify-between border-e border-grey-600">
      <div className="my-2 px-2">
        <div
          className={`text-white text-md font-bold pl-3 p-2 my-3 mb-3 rounded-md ${logoFont.className} hover:bg-slate-900`}
        >
          <span className="flex justify-between cursor-pointer">
            <span className="flex flex-row gap-1">
              <MessageCirclePlus /> New Chat
            </span>
            <span className="flex items-center">
              <PenLine />
            </span>
          </span>
        </div>
        <div className="h-[75vh] overflow-y-scroll no-scrollbar">
          <ul className="space-y-1">
            {chats.map((chat) => (
              <li key={chat.id}>
                <a
                  className="block rounded-lg bg-black text-white px-4 py-2 text-sm font-medium hover:bg-slate-900 hover:text-text-100"
                  href="#"
                >
                  {chat.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-600">
        <div className="flex items-center gap-2  p-4 hover:bg-gray-800">
          <Image
            alt=""
            src="https://avatars.githubusercontent.com/u/124599?v=4"
            width={40}
            height={40}
            className="rounded-full"
          />

          <div>
            <p className="text-xs text-white">
              <strong className="block font-medium">Test User</strong>
              <span> example@gmail.com </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
