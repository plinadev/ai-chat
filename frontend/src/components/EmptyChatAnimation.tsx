import {
  IoDocument,
  IoChatbubble,
  IoSparkles,
  IoSearch,
} from "react-icons/io5";

const EmptyChatAnimation = () => {
  return (
    <div className="flex h-full items-center justify-items-center">
      <div className="text-center max-w-lg mx-auto px-4">
        {/* Animated illustration */}
        <div className="relative mb-8">
          {/* Background glow effects */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 bg-gradient-to-r from-yellow-400/10 to-teal-400/10 rounded-full blur-2xl animate-pulse"></div>
          </div>

          {/* Main animation container */}
          <div className="relative z-10 flex items-center justify-center">
            {/* Floating sparkles */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${20 + i * 8}%`,
                    top: `${15 + (i % 3) * 25}%`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                >
                  <IoSparkles
                    size={8 + (i % 3) * 4}
                    className="text-yellow-400/60 animate-twinkle"
                  />
                </div>
              ))}
            </div>

            {/* Central conversation illustration */}
            <div className="relative flex items-center space-x-6">
              {/* PDF Document */}
              <div className="relative">
                <div className="bg-base-100 border-2 border-yellow-400/30 rounded-lg p-4 shadow-lg animate-float-gentle transform hover:scale-105 transition-transform duration-300">
                  <IoDocument size={32} className="text-yellow-400 mx-auto" />
                  <div className="mt-2 space-y-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-1 bg-yellow-400/20 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
                {/* PDF label */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs text-yellow-400 font-medium bg-yellow-400/10 px-2 py-1 rounded-full">
                    PDF
                  </span>
                </div>
              </div>

              {/* Connecting animation - flowing dots */}
              <div className="flex items-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-teal-400 rounded-full animate-flow-dots"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  ></div>
                ))}
              </div>

              {/* Chat Bubble */}
              <div className="relative">
                <div className="bg-base-100 border-2 border-teal-400/30 rounded-2xl p-4 shadow-lg animate-float-gentle-delayed transform hover:scale-105 transition-transform duration-300">
                  <IoChatbubble size={32} className="text-teal-400 mx-auto" />
                  <div className="mt-2 flex justify-center space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 bg-teal-400/40 rounded-full animate-typing-dots"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
                {/* AI label */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs text-teal-400 font-medium bg-teal-400/10 px-2 py-1 rounded-full">
                    AI
                  </span>
                </div>
              </div>
            </div>

            {/* Search icon orbiting */}
            <div
              className="absolute inset-0 animate-spin pointer-events-none"
              style={{ animationDuration: "12s" }}
            >
              <div className="relative w-full h-full">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                  <IoSearch
                    size={16}
                    className="text-base-content/20 animate-bounce"
                    style={{ animationDelay: "0s" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated text content */}
        <div className="space-y-4">
          {/* Main headline with staggered word animation */}
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold text-base-content/70 leading-tight">
              <span
                className="inline-block animate-word-slide"
                style={{ animationDelay: "0.1s" }}
              >
                Ask
              </span>{" "}
              <span
                className="inline-block animate-word-slide"
                style={{ animationDelay: "0.2s" }}
              >
                any
              </span>{" "}
              <span
                className="inline-block animate-word-slide"
                style={{ animationDelay: "0.3s" }}
              >
                question
              </span>{" "}
              <span
                className="inline-block animate-word-slide"
                style={{ animationDelay: "0.4s" }}
              >
                about
              </span>{" "}
              <span
                className="inline-block animate-word-slide"
                style={{ animationDelay: "0.5s" }}
              >
                your
              </span>{" "}
              <span
                className="inline-block text-[var(--color-logo-yellow)] animate-word-slide-special"
                style={{ animationDelay: "0.6s" }}
              >
                PDF
              </span>
              <span
                className="inline-block animate-word-slide"
                style={{ animationDelay: "0.7s" }}
              >
                !
              </span>
            </h2>
          </div>

          {/* Subtitle with breathing animation */}
          <div
            className="animate-fade-in"
            style={{
              animationDelay: "1s",
              animationFillMode: "forwards",
              opacity: 0,
            }}
          >
            <p className="text-base-content/50 text-lg animate-breathe">
              I'm ready to help you explore and understand your document
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-gentle {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes float-gentle-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes flow-dots {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes typing-dots {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        @keyframes word-slide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes word-slide-special {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes breathe {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-questions {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }

        .animate-float-gentle-delayed {
          animation: float-gentle-delayed 4s ease-in-out infinite 0.5s;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-flow-dots {
          animation: flow-dots 1.5s ease-in-out infinite;
        }

        .animate-typing-dots {
          animation: typing-dots 1.8s ease-in-out infinite;
        }

        .animate-word-slide {
          animation: word-slide 0.6s ease-out both;
        }

        .animate-word-slide-special {
          animation: word-slide-special 0.8s ease-out both;
        }

        .animate-breathe {
          animation: breathe 3s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-in-questions {
          animation: slide-in-questions 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default EmptyChatAnimation;
