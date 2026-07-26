import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API_URL } from "../../config";

function ResumeChat({ resumeText }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const askAI = async () => {
    if (!question.trim()) return;

    if (!resumeText) {
      alert("Resume text not found.");
      return;
    }

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: currentQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/api/ai/chat`,
        {
          resumeText,
          question: currentQuestion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: res.data.answer,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Unable to get AI response.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="bg-white rounded-2xl shadow-xl mt-10 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">

        <h2 className="text-3xl font-bold">
          🤖 Resume AI Assistant
        </h2>

        <p className="mt-2 text-purple-100">
          Ask anything about your resume.
        </p>

      </div>

      <div className="h-[450px] overflow-y-auto p-6 bg-gray-50">

        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-16">

            <h3 className="text-2xl font-bold mb-6">
              Start a Conversation
            </h3>

            <div className="space-y-4">

              <div className="bg-white rounded-xl p-4 shadow">
                How can I improve my ATS score?
              </div>

              <div className="bg-white rounded-xl p-4 shadow">
                Suggest better projects.
              </div>

              <div className="bg-white rounded-xl p-4 shadow">
                Is my resume good for React Developer?
              </div>

              <div className="bg-white rounded-xl p-4 shadow">
                Which skills are missing?
              </div>

            </div>

          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-5 ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-5 py-4 whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white shadow"
              }`}
            >
              <div className="font-semibold mb-2">
                {msg.role === "user"
                  ? "👤 You"
                  : "🤖 Gemini"}
              </div>

              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start mb-5">

            <div className="bg-white shadow rounded-2xl px-5 py-4">

              <div className="font-semibold mb-2">
                🤖 Gemini
              </div>

              <div className="flex gap-2">

                <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce"></div>

                <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce delay-100"></div>

                <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce delay-200"></div>

              </div>

            </div>

          </div>
        )}

        <div ref={bottomRef}></div>

      </div>
            <div className="border-t bg-white p-5">

        <div className="flex gap-3">

          <input
            type="text"
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !loading
              ) {
                askAI();
              }
            }}
            placeholder="Ask anything about your resume..."
            className="flex-1 border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={askAI}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-8 rounded-xl transition font-semibold"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Send"
            )}
          </button>

        </div>

        <p className="text-sm text-gray-500 mt-3">
          AI answers are based on your uploaded resume and Gemini AI.
        </p>

      </div>

    </motion.div>
  );
}

export default ResumeChat;