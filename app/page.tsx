"use client";
import ChatPanel from "@/components/chatPanel/ChatPanel";
import Header from "@/components/chatPanel/Header";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="h-screen bg-black">
      <div className="h-full mx-auto ">
        <div className="grid grid-cols-4 h-full">
          <div className="hidden md:block col-span-1">
            <Sidebar />
          </div>
          <div
            className="
                col-span-4
                md:col-span-3
                border-x-[1px] 
              border-neutral-800
              "
          >
            <Header />
            <ChatPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
