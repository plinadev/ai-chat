import { useState } from "react";
import { useFile } from "../../hooks/file/useFile";
import { IoSend, IoTimeOutline } from "react-icons/io5";
import { useAskQuestion } from "../../hooks/chat/useAskQuestion";

function ChatInput() {
  const userEmail = localStorage.getItem("userEmail");
  const { file } = useFile();
  const [inputValue, setInputValue] = useState("");
  const { askQuestion, isThinking } = useAskQuestion();

  const handleAskQuestion = () => {
    if (!file || !userEmail || !inputValue.trim()) return;
    askQuestion({ fileId: file._id, userEmail, question: inputValue });
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  };

  return (
    <div className="flex flex-col p-4 border-t border-base-300 lg:items-center">
      {file?.status === "pending" && (
        <div className="mb-4 p-3 bg-warning/10 border border-warning/20 rounded-lg lg:w-[50%]">
          <div className="flex items-center space-x-2 text-warning">
            <IoTimeOutline size={16} />
            <span className="text-sm">
              Please wait until the document is processed.
            </span>
          </div>
        </div>
      )}

      <div className="flex space-x-2 lg:w-[50%]">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            file?.status === "success"
              ? "Ask a question about your PDF..."
              : "Upload and process a PDF first..."
          }
          disabled={file?.status !== "success" || isThinking}
          className="input w-full h-12 rounded-lg"
        />
        <button
          disabled={
            file?.status !== "success" || !inputValue.trim() || isThinking
          }
          onClick={handleAskQuestion}
          className="h-12 w-12 btn btn-primary btn-square bg-[var(--color-logo-yellow)]/80 border-none rounded-lg"
        >
          <IoSend size={18} />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
