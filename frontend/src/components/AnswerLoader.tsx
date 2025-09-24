import { IoSparkles } from "react-icons/io5";

const AnswerLoader = () => {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center space-x-3">
        {/* Animated dots */}
        <div className="flex items-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-teal-400 rounded-full animate-pulse-wave"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1.4s",
              }}
            />
          ))}
        </div>

        {/* AI thinking text with breathing effect */}
        <div className="flex items-center space-x-2">
          <IoSparkles
            size={16}
            className="text-yellow-400 animate-gentle-sparkle"
          />
          <span className="text-base-content/60 text-sm animate-breathe-text">
            AI is thinking...
          </span>
        </div>

        {/* Subtle spinner */}
        <div className="relative">
          <div className="w-4 h-4 border-2 border-base-content/10 rounded-full animate-spin-slow">
            <div className="absolute top-0 left-0 w-1 h-1 bg-teal-400 rounded-full animate-ping" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-wave {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes gentle-sparkle {
          0%,
          100% {
            opacity: 0.5;
            transform: rotate(0deg) scale(1);
          }
          50% {
            opacity: 1;
            transform: rotate(180deg) scale(1.1);
          }
        }

        @keyframes breathe-text {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.9;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-pulse-wave {
          animation: pulse-wave 1.4s ease-in-out infinite;
        }

        .animate-gentle-sparkle {
          animation: gentle-sparkle 2s ease-in-out infinite;
        }

        .animate-breathe-text {
          animation: breathe-text 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnswerLoader;
