/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { sendMessageToGemini } from "../services/geminiService";

interface AssistantProps {
  contextData?: string;
}

const SUGGESTED_QUESTIONS = [
  "Which innovation scale is most common across all listed innovations in the dataset?",
  "Which country has the most listed innovations in the dataset?",
  "What is the most common Type of Innovation/Technology/Tool across the dataset?",
];

const Assistant: React.FC<AssistantProps> = ({ contextData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hello. Ask me anything about MFL innovations and data.",
      timestamp: Date.now(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (textOverride?: string) => {
    const textToSend =
      typeof textOverride === "string" ? textOverride : inputValue;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      role: "user",
      text: textToSend,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsThinking(true);

    try {
      const history = messages.map((m) => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(
        history,
        userMsg.text,
        contextData || ""
      );

      const aiMsg: ChatMessage = {
        role: "model",
        text: responseText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        role: "model",
        text: "I'm having trouble connecting right now.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[90vw] sm:w-[380px] h-[550px] mb-4 flex flex-col overflow-hidden border-2 border-[#064E3B]/10 animate-slide-up backdrop-blur-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#064E3B] to-[#059669] p-5 border-b border-[#064E3B]/20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="font-bold text-white text-lg">
                MFL Assistant
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Chat Area */}
          <div
            className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-slate-50 to-white"
            ref={scrollRef}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-md ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#064E3B] to-[#059669] text-white rounded-br-none"
                      : "bg-white text-slate-800 border-2 border-slate-100 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Suggested Questions - Only show when conversation is just starting */}
            {messages.length === 1 && !isThinking && (
              <div className="flex flex-col gap-3 mt-2">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider ml-1">
                  Suggested Questions
                </span>
                {SUGGESTED_QUESTIONS.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(question)}
                    className="text-left text-sm bg-white border-2 border-slate-200 text-slate-700 p-4 rounded-xl hover:bg-[#F0FDF4] hover:border-[#064E3B]/30 hover:shadow-md transition-all duration-200 active:scale-95 font-medium"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-md border-2 border-slate-100">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-[#059669] rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-[#059669] rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[#059669] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t-2 border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about data..."
                className="flex-1 bg-slate-50 rounded-full px-5 py-3 text-sm outline-none border-2 border-slate-200 focus:border-[#064E3B] focus:bg-white text-slate-800 transition-all duration-200"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isThinking}
                className="bg-gradient-to-r from-[#064E3B] to-[#059669] text-white p-3 rounded-full hover:shadow-lg hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trigger Button - Green Message Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-[#064E3B] to-[#059669] text-white w-16 h-16 flex items-center justify-center rounded-2xl shadow-2xl hover:scale-110 hover:shadow-[#064E3B]/50 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Assistant;
