"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiUser } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import PageLayout from "@/components/PageLayout";

const API_BASE_URL = "https://vercel-chatbot-api.vercel.app/"; // Update this with your FastAPI domain

const generateRandomString = (length = 12) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [sessionID] = useState(generateRandomString());

  const validCommands = ["help", "projects", "work", "publications", "blogs", "contact", "clear", "navigate"];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user`, {
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);

          const initialMessage = {
            type: "response",
            text: `Hello ${userData.email}! I am an AI chatbot developed by Nafis, based on his projects, work experiences, and research. How can I assist you today?`,
            timestamp: new Date().toLocaleTimeString(),
          };
          setMessages([initialMessage]);
        } else if (response.status === 401) {
          setUser(null);
          setMessages([]);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
        setMessages([]);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const queryAPI = async (queryText) => {
    try {
      const response = await Promise.race([
        fetch(`${API_BASE_URL}/query`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            session_id: sessionID,
          },
          body: JSON.stringify({ query_text: queryText }),
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 30000)),
      ]);

      if (!response.ok) {
        if (response.status === 401) {
          setUser(null);
          window.location.href = `${API_BASE_URL}/login`;
          return;
        }
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("API Error:", error);
      return "Oops, looks like my brains are kinda overrun. Try 'help' for FAQs!";
    }
  };

  const handleSend = async () => {
    if (input.trim() && !isSending) {
      const userMessage = {
        type: "user",
        text: input,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const userCommand = input.trim().toLowerCase();
      setInput("");
      inputRef.current.focus();

      if (validCommands.includes(userCommand)) {
        let response = "";
        switch (userCommand) {
          case "help":
            response = "List of valid commands: " + validCommands.join(", ");
            break;
          case "projects":
            response = `I have several projects in my portfolio.`;
            break;
          case "work":
            response = `I have worked at multiple companies before.`;
            break;
          case "publications":
            response = `I have multiple research publications.`;
            break;
          case "blogs":
            response = `I have multiple blog posts.`;
            break;
          case "contact":
            response = "My email is nafisulislam2k2@gmail.com";
            break;
          case "navigate":
            response = "You can navigate the site using the navbar.";
            break;
          case "clear":
            setMessages([]);
            return;
          default:
            break;
        }
        setMessages((prevMessages) => [...prevMessages, { type: "response", text: response, timestamp: new Date().toLocaleTimeString() }]);
      } else {
        setIsSending(true);
        try {
          const apiResponse = await queryAPI(userCommand);
          setMessages((prevMessages) => [...prevMessages, { type: "response", text: apiResponse, timestamp: new Date().toLocaleTimeString() }]);
        } catch (error) {
          console.error("Error sending message:", error);
        } finally {
          setIsSending(false);
        }
      }
    }
  };

  const signInWithGoogle = () => {
    window.location.href = `${API_BASE_URL}/login`;
  };

  const signOut = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setUser(null);
        setMessages([]);
      } else {
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) {
    return (
      <PageLayout title="AI Chatbot">
        <div className="min-h-screen flex items-center justify-center">
          <button
            onClick={signInWithGoogle}
            className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          >
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span>Login with Google to Chat</span>
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="AI Chatbot">
      <div className="flex flex-col p-6 font-montserrat relative pb-20 overflow-hidden">
        <button onClick={signOut} className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150">
          Sign Out
        </button>
        <div className="messages-container overflow-y-auto flex-grow mb-4 pr-2">
          {messages.map((message, index) => (
            <div key={index} className={`message-bubble flex items-start gap-2.5 mb-2 ${message.type === "user" ? "justify-end" : ""}`}>
              {message.type === "user" ? <FiUser className="w-8 h-8 text-highlight" /> : <FaRobot className="w-8 h-8 text-highlight" />}
              <div className="message-content">{message.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Chatbot;
