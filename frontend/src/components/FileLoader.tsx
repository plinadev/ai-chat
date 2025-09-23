import { IoCloudUpload, IoDocument } from "react-icons/io5";

function FileLoader() {
  return (
    <div className="flex-1 overflow-y-auto my-2 space-y-4 lg:w-[50%] self-center content-center">
      <div className="flex-1 overflow-y-auto my-2 space-y-4 self-center">
        <div className="flex items-center justify-center min-h-[400px] p-8">
          <div className="text-center max-w-md mx-auto">
            {/* Animated file upload illustration */}
            <div className="relative mb-8">
              {/* Background glow effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-r from-yellow-400/30 to-teal-400/30 rounded-full blur-xl animate-pulse"></div>
              </div>

              {/* Main animation container */}
              <div className="relative z-10 flex items-center justify-center">
                {/* Floating particles */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-teal-400 rounded-full opacity-60"
                      style={{
                        left: `${20 + i * 12}%`,
                        top: `${30 + (i % 2) * 40}%`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    >
                      <div className="w-full h-full animate-ping"></div>
                    </div>
                  ))}
                </div>

                {/* Central document icon with upload animation */}
                <div className="relative">
                  {/* Document base */}
                  <div className="relative bg-base-100 border-2 border-base-300 rounded-lg p-6 shadow-lg">
                    <IoDocument
                      size={48}
                      className="text-primary mx-auto mb-2"
                    />

                    {/* Animated upload arrow */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="animate-bounce">
                        <IoCloudUpload
                          size={24}
                          className="text-teal-400 drop-shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Processing bars animation */}
                    <div className="space-y-1 mt-4">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-1 bg-base-200 rounded-full overflow-hidden"
                        >
                          <div
                            className="h-full bg-gradient-to-r from-yellow-400 to-teal-400 rounded-full animate-pulse"
                            style={{
                              width: `${60 + i * 15}%`,
                              animationDelay: `${i * 0.2}s`,
                              animationDuration: "1.5s",
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Orbital elements */}
                  <div
                    className="absolute inset-0 animate-spin"
                    style={{ animationDuration: "8s" }}
                  >
                    <div className="relative w-full h-full">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                        <div className="w-3 h-3 bg-yellow-400/60 rounded-full animate-pulse"></div>
                      </div>
                      <div className="absolute bottom-0 right-0 transform translate-x-2 translate-y-2">
                        <div
                          className="w-2 h-2 bg-teal-400/60 rounded-full animate-pulse"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                      </div>
                      <div className="absolute top-1/2 left-0 transform -translate-x-2 -translate-y-1/2">
                        <div
                          className="w-2 h-2 bg-success/60 rounded-full animate-pulse"
                          style={{ animationDelay: "1s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated text content */}
            <div className="space-y-4">
              <div className="animate-fade-in">
                <h3 className="text-xl font-semibold text-base-content mb-2">
                  Uploading your document
                </h3>
                <p className="text-base-content/70 text-sm">
                  Please wait while we prepare your PDF for analysis...
                </p>
              </div>

              {/* Loading steps */}
              <div className="space-y-3 mt-6">
                {[
                  {
                    step: "Uploading to secure storage",
                    delay: "0s",
                    active: true,
                  },
                  {
                    step: "Extracting text content",
                    delay: "1s",
                    active: false,
                  },
                  {
                    step: "Preparing for AI analysis",
                    delay: "2s",
                    active: false,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center space-x-3 text-sm opacity-0 animate-fade-in-up"
                    style={{
                      animationDelay: item.delay,
                      animationFillMode: "forwards",
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      {item.active ? (
                        <div className="loading loading-spinner loading-xs text-primary"></div>
                      ) : (
                        <div className="w-4 h-4 border border-base-300 rounded-full"></div>
                      )}
                      <span
                        className={
                          item.active
                            ? "text-base-content"
                            : "text-base-content/50"
                        }
                      >
                        {item.step}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress indicator */}
              <div
                className="mt-6 animate-fade-in"
                style={{
                  animationDelay: "0.5s",
                  animationFillMode: "forwards",
                  opacity: 0,
                }}
              >
                <div className="w-full bg-base-200 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-400 to-teal-400 rounded-full animate-progress-bar"></div>
                </div>
                <p className="text-xs text-base-content/50 mt-2">
                  This usually takes a few seconds...
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes progress-bar {
            0% {
              width: 0%;
            }
            50% {
              width: 60%;
            }
            100% {
              width: 85%;
            }
          }

          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out;
          }

          .animate-progress-bar {
            animation: progress-bar 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
}

export default FileLoader;
