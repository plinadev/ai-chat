import {
  IoSparkles,
  IoChatbubble,
  IoDocument,
  IoStar,
} from "react-icons/io5";

const PageLoader = () => {
  return (
    <div className="flex-1 overflow-y-auto my-2 space-y-4 lg:w-[50%] self-center content-center">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <IoSparkles
              size={8 + Math.random() * 20}
              className="text-yellow-400 animate-float-random"
            />
          </div>
        ))}
      </div>

      {/* Main loader content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Central AI brain animation */}
        <div className="relative mb-8">
          <div className="relative mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400/30 to-teal-400/30 rounded-2xl flex items-center justify-center animate-pulse-glow">
            <IoChatbubble
              size={40}
              className="text-primary animate-brain-pulse"
            />

            {/* Orbiting elements */}
            <div
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: "4s" }}
            >
              <IoStar
                size={16}
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-yellow-400"
              />
              <IoDocument
                size={16}
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-teal-400"
              />
              <IoSparkles
                size={14}
                className="absolute top-1/2 -left-2 transform -translate-y-1/2 text-success"
              />
              <IoSparkles
                size={14}
                className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-success"
              />
            </div>
          </div>

          {/* Energy waves */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-24 h-24 border-2 border-success/20 rounded-2xl animate-energy-wave"
                style={{
                  width: `${80 + i * 20}px`,
                  height: `${80 + i * 20}px`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading text with typewriter effect */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-base-content animate-fade-in">
            <span
              className="inline-block animate-typewriter-word"
              style={{ animationDelay: "0.5s" }}
            >
              Initializing
            </span>{" "}
            <span
              className="inline-block text-[var(--color-logo-yellow)] animate-typewriter-word"
              style={{ animationDelay: "1s" }}
            >
              AI
            </span>{" "}
            <span
              className="inline-block animate-typewriter-word"
              style={{ animationDelay: "1.5s" }}
            >
              Assistant
            </span>
          </h2>

          {/* Loading steps */}
          <div className="space-y-3 mt-6">
            {[
              {
                text: "Loading conversation history...",
                delay: "0.8s",
                icon: IoChatbubble,
              },
              {
                text: "Preparing AI models...",
                delay: "1.8s",
                icon: IoStar,
              },
              {
                text: "Establishing secure connection...",
                delay: "2.8s",
                icon: IoSparkles,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-3 opacity-0 animate-slide-in-step"
                style={{
                  animationDelay: step.delay,
                  animationFillMode: "forwards",
                }}
              >
                <step.icon
                  size={16}
                  className="text-primary animate-bounce-gentle"
                />
                <span className="text-sm text-base-content/70">
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div
            className="mt-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
          >
            <div className="w-64 mx-auto bg-base-300 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-400/70 via-success/50 to-teal-400/50 rounded-full animate-progress-fill"></div>
            </div>
            <p className="text-xs text-base-content/50 mt-3 animate-pulse">
              Almost ready...
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-random {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.3;
          }
          33% {
            transform: translate(10px, -10px) rotate(120deg);
            opacity: 1;
          }
          66% {
            transform: translate(-10px, 10px) rotate(240deg);
            opacity: 0.6;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(245, 188, 0, 0.2),
              0 0 40px rgba(61, 218, 180, 0.1);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 30px rgba(245, 188, 0, 0.4),
              0 0 60px rgba(61, 218, 180, 0.2);
            transform: scale(1.05);
          }
        }

        @keyframes brain-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        @keyframes energy-wave {
          0% {
            opacity: 1;
            transform: scale(0.8);
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }

        @keyframes typewriter-word {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-step {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes progress-fill {
          0% {
            width: 0%;
          }
          20% {
            width: 30%;
          }
          50% {
            width: 60%;
          }
          80% {
            width: 85%;
          }
          100% {
            width: 95%;
          }
        }

        @keyframes wave-dots {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
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

        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        .animate-float-random {
          animation: float-random 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-brain-pulse {
          animation: brain-pulse 1.5s ease-in-out infinite;
        }

        .animate-energy-wave {
          animation: energy-wave 2s ease-out infinite;
        }

        .animate-typewriter-word {
          animation: typewriter-word 0.6s ease-out both;
        }

        .animate-slide-in-step {
          animation: slide-in-step 0.8s ease-out both;
        }

        .animate-progress-fill {
          animation: progress-fill 4s ease-in-out infinite;
        }

        .animate-wave-dots {
          animation: wave-dots 1.2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
