import Layout from "../components/layout/Layout";
import { useFile } from "../hooks/file/useFile";
import FileLoader from "../components/FileLoader";
import FileErrorAnimation from "../components/FileErrorAnimation";
import PageLoader from "../components/PageLoader";
import { useStatus } from "../hooks/file/useStatus";
import { useChat } from "../hooks/chat/useChat";
import Conversation from "../components/chat/Conversation";
import NavBar from "../components/NavBar";
import ChatInput from "../components/chat/ChatInput";
import FileComponent from "../components/FileComponent";
import FileUpload from "../components/FileUpload";
import { useIsMutating } from "@tanstack/react-query";

function Chat() {
  useStatus();
  const { file, isFetching } = useFile();
  const isProcessing = useIsMutating({ mutationKey: ["selectFile"] }) > 0;
  const isDeleting = useIsMutating({ mutationKey: ["deleteFile"] }) > 0;
  const { isFetching: isFetchingChat } = useChat();

  return (
    <Layout>
      <div className="w-full h-screen p-10 flex flex-col">
        <div className="flex flex-col w-full h-full bg-base-100 rounded-2xl shadow-lg">
          <NavBar />

          {/* Main content */}
          <div className="h-full flex flex-col overflow-hidden">
            {isFetching || isDeleting || isFetchingChat ? (
              <PageLoader />
            ) : (
              <>
                {/* File Upload */}
                {!file && <FileUpload />}

                {/* File Status */}
                {file && <FileComponent />}

                {/* Status Cases */}
                {file?.status === "pending" || isProcessing ? (
                  <FileLoader />
                ) : null}

                {file?.status === "error" && <FileErrorAnimation />}

                {file?.status === "success" && <Conversation />}

                {/* Input */}
                <ChatInput />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Chat;
