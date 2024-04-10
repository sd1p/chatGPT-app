import Image from "next/image";

interface ChatBubbleProps {
  message: any;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  return (
    <div className="flex flex-row items-start justify-start gap-4 mx-12">
      <div className="flex items-center justify-center mt-4 w-10 h-10rounded-full">
        {message.role === "assistant" ? (
          <Image
            alt=""
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/768px-ChatGPT_logo.svg.png"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <Image
            alt=""
            src="https://avatars.githubusercontent.com/u/124599?v=4"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col">
        <div className="p-4">
          <h1 className="font-bold">
            {message.role === "user" ? "You" : "ChatBot"}
          </h1>
          <p className="text-white break-words max-w-[60vh]">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
