"use client";

import { useEffect, useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { sendMessage } from "@/services/chatBot";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<
    {
      content: string;
      isUser: boolean;
    }[]
  >([]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })!!;
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = e.currentTarget.message.value;
    e.currentTarget.reset();
    setMessages([...messages]);
    const response = await sendMessage(message);
    setMessages([
      ...messages,
      {
        content: message,
        isUser: true,
      },
      {
        content: response.response,
        isUser: false,
      },
    ]);
  };

  return (
    <div className="w-20 hover:w-24 fixed bottom-10 right-10">
      <button
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <svg
          xmlns=" http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white block border-gray-200 align-middle"
        >
          <path
            d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
            className="border-gray-200"
          ></path>
        </svg>
      </button>
      <div
        className={`fixed bottom-[calc(1rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[340px] h-[400px] ${
          isChatOpen ? "block" : "hidden"
        }`}
      >
        <IoMdCloseCircleOutline
          className="absolute -mt-6 -ml-6 hover:text-red-500"
          size={30}
          onClick={() => setIsChatOpen(!isChatOpen)}
        />
        <div className="flex flex-col space-y-1.5 pb-6 ">
          <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
          <p className="text-sm text-[#6b7280] leading-3">
            Powered by power training
          </p>
        </div>

        <div className="h-[250px] min-h-[250px] max-h-[250px] overflow-y-scroll w-[300px]">
          <div className="flex flex-col my-4 text-gray-600 text-sm overflow-y-auto min-w-full">
            {messages.map((message, index) => (
              <>
                {message.isUser ? (
                  <div
                    className="flex gap-2 my-4 min-w-full text-gray-600 text-sm flex-1 text-right px-4"
                    key={index}
                  >
                    <p
                      className="leading-relaxed bg-gray-300 text-right h-full w-full p-2 rounded-md"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {message.content}
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-2 my-4 text-gray-600 text-sm flex-1">
                    <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                      <div className="rounded-full bg-gray-100 border p-1">
                        <svg
                          stroke="none"
                          fill="black"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                          ></path>
                        </svg>
                      </div>
                    </span>
                    <p
                      className="leading-relaxed"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      <span className="block font-bold text-gray-700">AI </span>
                      {message.content}
                    </p>
                  </div>
                )}
              </>
            ))}
            <div ref={endOfMessagesRef} />
          </div>
        </div>
        <div className="flex items-center pt-0 bottom-2 absolute">
          <form
            className="flex items-center justify-center w-full space-x-2"
            onSubmit={(e) => handleSendMessage(e)}
          >
            <input
              className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Type your message"
              name="message"
            />
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
