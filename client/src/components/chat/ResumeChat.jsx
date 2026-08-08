import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FileText, MessageCircle } from "lucide-react";
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        flex
        h-[calc(100vh-105px)]
        min-h-[560px]
        w-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-xl
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          shrink-0
          border-b
          border-white/10
          bg-gradient-to-r
          from-blue-700
          via-indigo-700
          to-violet-700
          px-6
          py-5
          sm:px-8
        "
      >
        <div className="flex items-center gap-4">

          {/* Resume Chat Icon */}

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-white/15
              shadow-lg
              ring-1
              ring-white/20
              backdrop-blur-sm
            "
          >
            <div className="relative">

              <FileText
                className="
                  h-7
                  w-7
                  text-white
                "
              />

              <MessageCircle
                className="
                  absolute
                  -bottom-1
                  -right-2
                  h-4
                  w-4
                  fill-blue-600
                  text-white
                "
              />

            </div>
          </div>

          {/* Heading */}

          <div>

            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="
                text-xl
                font-bold
                tracking-tight
                text-white
                sm:text-2xl
              "
            >
              Resume Chat Assistant
            </motion.h2>

            <p
              className="
                mt-1
                text-sm
                font-medium
                text-blue-100
              "
            >
              Chat with your resume and get personalized career guidance.
            </p>

          </div>

        </div>
      </div>

      {/* =====================================================
          CHAT AREA
      ===================================================== */}

      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          bg-slate-50
          px-4
          py-4
          sm:px-6
          dark:bg-slate-950
        "
      >

        {/* ===================================================
            EMPTY STATE
        =================================================== */}

        {messages.length === 0 && (

          <div className="flex h-full flex-col justify-center">

            <div className="mx-auto w-full max-w-4xl">

              <div className="mb-5 text-center">

                <div
                  className="
                    mx-auto
                    mb-3
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-100
                    text-blue-600
                    dark:bg-blue-900/30
                    dark:text-blue-400
                  "
                >
                  <MessageCircle className="h-5 w-5" />
                </div>

                <h3
                  className="
                    text-xl
                    font-bold
                    text-slate-800
                    dark:text-white
                  "
                >
                  Start a Conversation
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Choose a question or ask anything about your resume.
                </p>

              </div>

              {/* Suggestions */}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {suggestions.map((item, index) => (

                  <motion.button
                    key={index}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setQuestion(item)}
                    className="
                      flex
                      min-h-[52px]
                      items-center
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      text-left
                      text-sm
                      font-medium
                      text-slate-700
                      shadow-sm
                      transition-all
                      duration-200
                      hover:border-blue-400
                      hover:bg-blue-50
                      hover:shadow-md
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-slate-200
                      dark:hover:border-blue-500
                      dark:hover:bg-slate-800
                    "
                  >

                    <span
                      className="
                        mr-3
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-blue-100
                        text-blue-600
                        dark:bg-blue-900/30
                        dark:text-blue-400
                      "
                    >
                      <MessageCircle className="h-4 w-4" />
                    </span>

                    <span>
                      {item}
                    </span>

                  </motion.button>

                ))}

              </div>

            </div>

          </div>

        )}

        {/* ===================================================
            MESSAGES
        =================================================== */}

        {messages.length > 0 && (

          <div className="mx-auto w-full max-w-4xl">

            {messages.map((msg, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`
                    max-w-[90%]
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    shadow-sm
                    sm:max-w-[78%]
                    ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    }
                  `}
                >

                  <div className="mb-1 flex items-center gap-2 text-xs font-bold opacity-80">

                    {msg.role === "user" ? (
                      <>
                        <span>👤</span>
                        <span>You</span>
                      </>
                    ) : (
                      <>
                        <FileText className="h-3.5 w-3.5" />
                        <span>Resume AI</span>
                      </>
                    )}

                  </div>

                  <div className="whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </div>

                </div>

              </motion.div>

            ))}

            {/* Loading */}

            {loading && (

              <div className="mb-4 flex justify-start">

                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3
                    shadow-sm
                    dark:border-slate-700
                    dark:bg-slate-800
                  "
                >

                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-xs
                      font-bold
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Resume AI
                  </div>

                  <div className="flex gap-1.5">

                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500" />

                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500 [animation-delay:150ms]" />

                    <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500 [animation-delay:300ms]" />

                  </div>

                </div>

              </div>

            )}

            <div ref={bottomRef} />

          </div>

        )}

      </div>

      {/* =====================================================
          INPUT FOOTER
      ===================================================== */}

      <div
        className="
          shrink-0
          border-t
          border-slate-200
          bg-white
          px-4
          py-3
          sm:px-6
          dark:border-slate-800
          dark:bg-slate-900
        "
      >

        <div className="mx-auto w-full max-w-4xl">

          <div className="flex items-center gap-2">

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
                min-w-0
                flex-1
                rounded-xl
                border
                border-slate-300
                bg-slate-50
                px-4
                py-3
                text-sm
                text-slate-900
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-500/20
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-400
              "
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={askAI}
              disabled={loading}
              className="
                flex
                h-11
                min-w-[82px]
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                px-5
                text-sm
                font-bold
                text-white
                shadow-md
                transition-all
                hover:from-blue-700
                hover:to-indigo-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Send"
              )}

            </motion.button>

          </div>

          <div className="mt-2 flex items-center justify-between">

            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              Powered by your uploaded resume + Gemini AI
            </p>

            <span className="hidden text-[11px] text-slate-400 sm:block">
              Press Enter to send
            </span>

          </div>

        </div>

      </div>

    </motion.div>
  );
}

export default ResumeChat;