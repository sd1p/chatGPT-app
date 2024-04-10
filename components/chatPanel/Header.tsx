import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { fetchChats, selectAllChats } from "@/lib/features/chats/chatSlice";
import { AppDispatch } from "@/lib/store";
import { MessageCirclePlus, PenLine } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const logoFont = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chats = useSelector(selectAllChats);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);
  return (
    <div className="w-full h-[10vh] border-y-[1px] bg-grey-900 flex flex-row">
      <Sheet>
        <SheetTrigger className="text-white mx-5 md:hidden">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z"
              fill="currentColor"
            ></path>
          </svg>
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-black">
          <SheetHeader>
            <SheetTitle>
              <span
                className={`flex justify-between cursor-pointer ${logoFont.className} hover:bg-slate-800 rounded-md p-2`}
              >
                <span className="flex flex-row gap-1 my-2">
                  <MessageCirclePlus /> New Chat
                </span>
                <span className="flex items-center">
                  <PenLine />
                </span>
              </span>
            </SheetTitle>
          </SheetHeader>
          <div className="h-[75vh] overflow-y-scroll no-scrollbar mt-4">
            <ul className="space-y-1">
              {chats.map((chat) => (
                <li key={chat.id}>
                  <a
                    className="block rounded-lg bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-700 hover:text-text-100"
                    href="#"
                  >
                    {chat.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex justify-start items-center md:justify-center pr-10 md:pl-8">
        <span className="font-bold">GPT-3.5</span>
      </div>
    </div>
  );
};

export default Header;
