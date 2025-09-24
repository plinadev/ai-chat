import { IoAlertCircle, IoRefresh, IoDocument, IoClose } from "react-icons/io5";

const FileErrorAnimation = () => {
  return (
    <div className="flex-1 overflow-y-auto my-2 space-y-4 lg:w-[50%] self-center content-center">
      <div className="flex items-center justify-center min-h-[400px] p-8">
        <div className="text-center max-w-md mx-auto">
          {/* Animated error illustration */}
          <div className="relative mb-8">
            {/* Background error glow effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-r from-error/10 to-error/20 rounded-full blur-xl animate-pulse"></div>
            </div>

            {/* Main animation container */}
            <div className="relative z-10 flex items-center justify-center">
              {/* Error particles - floating X marks */}
              <div className="absolute inset-0">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute opacity-60"
                    style={{
                      left: `${15 + i * 20}%`,
                      top: `${20 + (i % 2) * 50}%`,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  >
                    <IoClose size={12} className="text-error animate-float" />
                  </div>
                ))}
              </div>

              {/* Central document with error state */}
              <div className="relative">
                {/* Document with shake animation */}
                <div className="relative bg-base-100 border-2 border-error/30 rounded-lg p-6 shadow-lg animate-shake">
                  <IoDocument
                    size={48}
                    className="text-error/70 mx-auto mb-2"
                  />

                  {/* Error overlay - alert icon */}
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-error text-error-content rounded-full p-2 animate-error-pulse shadow-lg">
                      <IoAlertCircle size={20} />
                    </div>
                  </div>

                  {/* Corrupted/broken bars animation */}
                  <div className="space-y-1 mt-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-1 bg-base-200 rounded-full overflow-hidden"
                      >
                        <div
                          className="h-full bg-error/30 rounded-full animate-error-bar"
                          style={{
                            width: `${30 + i * 10}%`,
                            animationDelay: `${i * 0.3}s`,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warning triangles orbiting */}
                <div
                  className="absolute inset-0 animate-spin"
                  style={{ animationDuration: "6s" }}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3">
                      <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-warning animate-pulse"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 transform translate-x-3 translate-y-3">
                      <div
                        className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-error animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated text content */}
          <div className="space-y-4">
            <div className="animate-slide-up">
              <div className="flex items-center justify-center mb-3">
                <IoAlertCircle
                  size={24}
                  className="text-error mr-2 animate-bounce"
                />
                <h3 className="text-xl font-semibold text-error">
                  Processing Failed
                </h3>
              </div>
              <p className="text-base-content/70 text-sm leading-relaxed">
                We encountered an issue while processing your PDF.
                <br />
                Don't worry - this happens sometimes!
              </p>
            </div>

            {/* Error details with slide-in animation */}
            <div className="bg-error/5 border border-error/20 rounded-lg p-4 animate-fade-in-delayed">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center space-x-2 text-error/80">
                  <div className="w-2 h-2 bg-error/60 rounded-full animate-ping"></div>
                  <span>File upload interrupted</span>
                </div>
                <p className="text-base-content/60 text-xs">
                  This could be due to file corruption, network issues, or
                  server problems.
                </p>
              </div>
            </div>

            <div
              className="mt-6 animate-bounce-in"
              style={{
                animationDelay: "0.8s",
                animationFillMode: "forwards",
                opacity: 0,
              }}
            >
              <p className="flex items-center justify-center text-error font-semibold">
                <IoRefresh size={18} />
                Reupload your file
              </p>
              <p className="text-xs text-base-content/50 mt-2">
                Or try uploading a different PDF
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-2px);
          }
          75% {
            transform: translateX(2px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(180deg);
          }
        }

        @keyframes error-pulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.4);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 0 8px rgba(248, 113, 113, 0);
          }
        }

        @keyframes error-bar {
          0% {
            width: 0%;
            opacity: 0.8;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.8;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delayed {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-shake {
          animation: shake 0.6s ease-in-out 3;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-error-pulse {
          animation: error-pulse 2s infinite;
        }

        .animate-error-bar {
          animation: error-bar 1.5s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-fade-in-delayed {
          animation: fade-in-delayed 0.8s ease-out 0.3s both;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FileErrorAnimation;
