import { useState, useEffect } from "react";

export default function SmartTextAnalyzerLoading({ isLoading = false }) {
  const [shouldRender, setShouldRender] = useState(isLoading);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let showTimer, hideTimer, progressTimer;

    if (isLoading) {
      setShouldRender(true);
      showTimer = setTimeout(() => setIsVisible(true), 10);

      // Simulate progress
      progressTimer = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + Math.random() * 10 : prev));
      }, 300);
    } else {
      setIsVisible(false);
      hideTimer = setTimeout(() => {
        setShouldRender(false);
        setProgress(0);
      }, 300);
    }

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearInterval(progressTimer);
    };
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 300ms ease-in-out",
        opacity: isVisible ? 1 : 0,
        backdropFilter: isVisible ? "blur(12px)" : "blur(0px)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Icon & Title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/logo.png"
            alt="Smart Text Analyzer Logo"
            width={48}
            height={48}
            style={{ marginRight: 12 }}
          />
          <h2
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#1f2937",
            }}
          >
            Smart Text Analyzer
          </h2>
        </div>

        {/* Spinner */}
        <div
          style={{
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #3b82f6",
            borderRadius: "50%",
            width: 60,
            height: 60,
            animation: "spin 1.5s ease-in-out infinite",
          }}
        />

        {/* Bouncing Text */}
        <p
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: "#334155",
            animation: "bounce 1.5s ease-in-out infinite",
          }}
        >
          Analyzing your text...
        </p>

        {/* Progress bar */}
        <div
          style={{
            width: 192,
            height: 10,
            backgroundColor: "#e5e7eb",
            borderRadius: 9999,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#3b82f6",
              borderRadius: 9999,
              transition: "width 200ms ease-in-out",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
