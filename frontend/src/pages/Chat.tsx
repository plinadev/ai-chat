import React, { useState, useRef, useEffect } from "react";
import {
  IoSend,
  IoCloudUpload,
  IoDocument,
  IoClose,
  IoTimeOutline,
} from "react-icons/io5";
import Layout from "../components/layout/Layout";
import logo from "../assets/logo.svg";
import toast from "react-hot-toast";
import { useSelectFile } from "../hooks/useSelectFile";
import { useFile } from "../hooks/useFile";
import FileLoader from "../components/FileLoader";
import FileErrorAnimation from "../components/FileErrorAnimation";
import EmptyChatAnimation from "../components/EmptyChatAnimation";
import PageLoader from "../components/PageLoader";
import { useStatus } from "../hooks/useStatus";
import { useDeleteFile } from "../hooks/useDeleteFile";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

function Chat() {
  useStatus();
  const userEmail = localStorage.getItem("userEmail")!;
  const { file, isFetching } = useFile();
  const { selectFile, isProcessing } = useSelectFile();
  const { deleteFile, isDeleting } = useDeleteFile();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Please upload PDF file only.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB.");
      return;
    }

    const userEmail = localStorage.getItem("userEmail")!;
    selectFile({ file, userEmail });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) handleFileSelect(droppedFiles[0]);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) handleFileSelect(files[0]);
  };

  return (
    <Layout>
      <div className="w-full h-screen p-10 flex flex-col">
        <div className="flex flex-col w-full h-full bg-base-100 rounded-2xl shadow-lg">
          {/* Navbar */}
          <div className="navbar shadow-lg shadow-teal-600/10">
            <div className="flex pl-5 items-center gap-3">
              <img
                src={logo}
                alt="Chat icon"
                className="w-10 h-10 opacity-90"
              />
              <h1 className="text-lg font-bold text-base-content">
                PDF Chat Assistant
              </h1>
            </div>
          </div>

          {/* Main content */}
          <div className="h-full flex flex-col overflow-hidden">
            {isFetching || isDeleting ? (
              <PageLoader />
            ) : (
              <>
                {/* File Upload */}
                {!file && (
                  <div className="h-full flex items-center justify-center p-8">
                    <div className="text-center max-w-md">
                      <div
                        className={`border-2 border-dashed rounded-lg p-8 transition-all duration-200 ${
                          isDragOver
                            ? "border-primary bg-primary/5"
                            : "border-base-300 hover:border-primary/50"
                        }`}
                        onDrop={handleDrop}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragOver(true);
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          setIsDragOver(false);
                        }}
                      >
                        <IoCloudUpload
                          size={48}
                          className="mx-auto text-[var(--color-logo-yellow)]/60 mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-2">
                          Upload a PDF to get started
                        </h3>
                        <p className="text-base-content/70 mb-4">
                          Drag & drop your PDF here, or click to browse
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Choose PDF File
                        </button>
                        <p className="text-sm text-base-content/60 mt-2">
                          Maximum file size: 10MB
                        </p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileInputChange}
                      />
                    </div>
                  </div>
                )}

                {/* File Status */}
                {file && (
                  <div className="flex mt-8 py-2 px-4 mx-4 bg-gradient-to-r from-[var(--color-logo-yellow)]/70 via-[var(--color-success)]/70 to-[var(--color-logo-teal)]/70 rounded-xl lg:w-[50%] lg:self-center">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex space-x-2 items-center">
                        <IoDocument size={20} />
                        <div className="font-medium">{file.userFilename}</div>
                      </div>
                      {(file.status === "success" ||
                        file.status === "error") && (
                        <button
                          className="btn btn-ghost btn-sm btn-circle text-accent hover:text-white hover:bg-primary"
                          onClick={() =>
                            deleteFile({ fileId: file._id, userEmail })
                          }
                          title="Remove file"
                        >
                          <IoClose size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Status Cases */}
                {file?.status === "pending" || isProcessing ? (
                  <FileLoader />
                ) : null}

                {file?.status === "error" && <FileErrorAnimation />}

                {file?.status === "success" && (
                  <div className="flex-1 overflow-y-auto my-2 space-y-4 lg:w-[50%] lg:self-center">
                    {messages.length === 0 && <EmptyChatAnimation />}

                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`chat ${
                          message.type === "user" ? "chat-end" : "chat-start"
                        }`}
                      >
                        <div className="chat-bubble rounded-xl chat-bubble-neutral">
                          {message.content}
                        </div>
                        <div className="chat-footer opacity-50 text-xs">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}

                {/* Input */}
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
                      placeholder={
                        file?.status === "success"
                          ? "Ask a question about your PDF..."
                          : "Upload and process a PDF first..."
                      }
                      disabled={file?.status !== "success"}
                      className="input w-full h-12 rounded-lg"
                    />
                    <button
                      disabled={
                        file?.status !== "success" || !inputValue.trim()
                      }
                      className="h-12 w-12 btn btn-primary btn-square bg-[var(--color-logo-yellow)]/80 border-none rounded-lg"
                    >
                      <IoSend size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Chat;
