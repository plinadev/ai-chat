import { useEffect, useRef } from "react";
import { useChat } from "../../hooks/chat/useChat";
import { useAskQuestion } from "../../hooks/chat/useAskQuestion";
import EmptyChatAnimation from "../EmptyChatAnimation";
import AnswerLoader from "../AnswerLoader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Conversation() {
  const { chat, isFetching } = useChat();
  const { isThinking } = useAskQuestion();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, isThinking]);

  if (isFetching) return null;

  return (
    <div className="flex-1 overflow-y-auto my-2 space-y-4 lg:w-[50%] lg:self-center">
      {chat?.length === 0 ? (
        <EmptyChatAnimation />
      ) : (
        <div className="space-y-4 p-4">
          {chat?.map((message) => (
            <div key={message._id} className="space-y-2">
              {/* User Message */}
              <div className="chat chat-end">
                <div className="chat-header text-xs text-[var(--color-logo-teal)] font-semibold mb-1">
                  You
                </div>
                <div className="chat-bubble bg-base-300 max-w-xs lg:max-w-md rounded-2xl">
                  {message.question}
                </div>
              </div>

              {/* AI Message */}
              <div className="chat chat-start">
                <div className="chat-header text-xs text-[var(--color-logo-yellow)] font-semibold mb-1">
                  AI Assistant
                </div>
                <div className="chat-bubble bg-transparent">
                  <div className="prose max-w-none leading-relaxed">
                    {message.answer ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.answer}
                      </ReactMarkdown>
                    ) : (
                      <AnswerLoader />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}

export default Conversation;
