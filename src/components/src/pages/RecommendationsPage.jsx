import { useState, useRef, useEffect } from "react";

export default function RecommendationsPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi ⚡ I am your Smart Energy Assistant. Ask me about saving electricity, bill reduction, AC usage etc."
    }
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getBotResponse = (msg) => {
    const text = msg.toLowerCase();

    if (text.includes("bill") || text.includes("cost")) {
      return "Use LED bulbs, reduce AC usage, and switch off idle appliances to reduce your bill.";
    }

    if (text.includes("ac")) {
      return "Set AC to 24–26°C and clean filters regularly to save electricity.";
    }

    if (text.includes("fan")) {
      return "Use energy-efficient fans and switch off when not needed.";
    }

    if (text.includes("save") || text.includes("reduce")) {
      return "Unplug devices when not in use and avoid standby power loss.";
    }

    return "Ask me about AC, bill, fan, or energy saving tips ⚡";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const botMsg = {
      role: "bot",
      text: getBotResponse(input),
    };

    setMessages((prev) => [...prev, botMsg]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        borderRadius: "12px",
        background: "#f9fafb",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      {/* TOP BUTTON */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <button
          onClick={() => window.location.href = "/survey-data"}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            background: "#10b981",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          📊 Survey Data
        </button>
      </div>

      {/* TITLE */}
      <h2 style={{ textAlign: "center" }}>
        ⚡ Smart Energy Chatbot
      </h2>

      {/* CHAT BOX */}
      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
          background: "white"
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              margin: "8px 0"
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "12px",
                background: m.role === "user" ? "#dbeafe" : "#e5e7eb"
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* INPUT + SEND */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about electricity saving..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={handleSend}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            background: "#6366f1",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}