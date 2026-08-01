import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
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
      toast.error("Resume text not found.");
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
        `${API_URL}/ai/chat`,
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

      toast.success("Response generated successfully!");

    } catch (err) {
      console.error(err);

      toast.error("Unable to get AI response.");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I couldn't generate a response. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "How can I improve my ATS score?",
    "Suggest better projects.",
    "Is my resume good for React Developer?",
    "Which skills are missing?",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        mt-10
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-xl
        transition-all
        duration-300
        dark:border-slate-800
        dark:bg-slate-900
      "
    >

    
          {/* ===========================
            Header
      =========================== */}

      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-6 py-7">

        <motion.h2
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-white"
        >
          🤖 Resume AI Assistant
        </motion.h2>

        <p className="mt-2 text-purple-100">
          Ask anything about your uploaded resume and get AI-powered guidance.
        </p>

      </div>

      {/* ===========================
            Chat Body
      =========================== */}

      <div
        className="
          h-[380px]
          sm:h-[460px]
          overflow-y-auto
          bg-slate-50
          p-5
          dark:bg-slate-950
        "
      >

        {messages.length === 0 && (

          <div className="mt-10 text-center">

            <h3 className="mb-8 text-2xl font-bold text-slate-800 dark:text-white">
              Start a Conversation
            </h3>

            <div className="space-y-4">

              {suggestions.map((item, index) => (

                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setQuestion(item)}
                  className="
                    cursor-pointer
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                    text-left
                    shadow
                    transition-all
                    hover:border-purple-400
                    hover:bg-purple-50
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                    dark:hover:bg-slate-800
                  "
                >
                  💡 {item}
                </motion.div>

              ))}

            </div>

          </div>

        )}

        {messages.map((msg, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-5 flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[92%] sm:max-w-[75%] rounded-2xl px-5 py-4 whitespace-pre-wrap shadow ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-slate-800 dark:text-white"
              }`}
            >

              <div className="mb-2 font-semibold">

                {msg.role === "user"
                  ? "👤 You"
                  : "🤖 Gemini AI"}

              </div>

              {msg.text}

            </div>

          </motion.div>

        ))}
                {/* ===========================
              Loading
        =========================== */}

        {loading && (

          <div className="mb-5 flex justify-start">

            <div className="rounded-2xl bg-white dark:bg-slate-800 dark:text-white px-5 py-4 shadow">

              <div className="mb-2 font-semibold">
                🤖 Gemini AI
              </div>

              <div className="flex gap-2">

                <span className="h-3 w-3 animate-bounce rounded-full bg-purple-500"></span>

                <span className="h-3 w-3 animate-bounce rounded-full bg-purple-500 [animation-delay:150ms]"></span>

                <span className="h-3 w-3 animate-bounce rounded-full bg-purple-500 [animation-delay:300ms]"></span>

              </div>

            </div>

          </div>

        )}

        <div ref={bottomRef} />

      </div>

      {/* ===========================
              Footer
      =========================== */}

      <div className="border-t border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

        <div className="flex flex-col gap-3 sm:flex-row">

          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                askAI();
              }
            }}
            placeholder="Ask anything about your resume..."
            className="
              flex-1
              rounded-2xl
              border
              border-slate-300
              bg-white
              px-5
              py-4
              text-slate-900
              outline-none
              transition
              focus:ring-2
              focus:ring-purple-500
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              dark:placeholder:text-slate-400
            "
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={askAI}
            disabled={loading}
            className="
              rounded-2xl
              bg-gradient-to-r
              from-purple-600
              to-indigo-600
              px-8
              py-4
              font-semibold
              text-white
              transition
              hover:from-purple-700
              hover:to-indigo-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? (
              <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Send"
            )}
          </motion.button>

        </div>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          AI responses are generated using your uploaded resume and Gemini AI.
        </p>

      </div>

    </motion.div>
  );
}

export default ResumeChat;
        