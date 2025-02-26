"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FiUser } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import PageLayout from '@/components/PageLayout';

const API_URL = "https://vercel-chatbot-api.vercel.app";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [remainingRequests, setRemainingRequests] = useState(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const validCommands = ['help', 'projects', 'work', 'publications', 'blogs', 'contact', 'clear', 'age', 'navigate'];

  const calculateAge = () => {
    const birthdate = new Date("2002-08-17");
    const now = new Date();
    const diffTime = Math.abs(now - birthdate);
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    return diffYears.toFixed(10);
  };

  const [age, setAge] = useState(calculateAge());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAge(calculateAge());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Initial message
    const initialMessage = {
      type: 'response',
      text: `Hello! I am an AI chatbot developed by Nafis, based on his projects, work experiences, and research. I can answer any of your questions regarding them.\n\nPlease note that I am under active development, and I may occasionally generate incorrect information.\n\nHow can I assist you today?`,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([initialMessage]);

    // Check remaining requests
    checkRemainingRequests();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const checkRemainingRequests = async () => {
    try {
      const response = await fetch(`${API_URL}/api/remaining-requests`, {
        headers: {
          'Origin': 'https://nafisui.com'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setRemainingRequests(data.remaining_requests);
      }
    } catch (error) {
      console.error('Error checking remaining requests:', error);
    }
  };

  const queryAPI = async (queryText) => {
    try {
      const response = await Promise.race([
        fetch(`${API_URL}/query`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'https://nafisui.com'
          },
          body: JSON.stringify({
            query_text: queryText,
          })
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 30000)
        )
      ]);

      if (!response.ok) {
        if (response.status === 429) {
          return "You've reached the maximum number of requests for today. Please try again tomorrow.";
        }
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      await checkRemainingRequests();
      return data.response;
    } catch (error) {
      console.error('API Error:', error);
      return "Sorry, I'm having trouble processing your request right now. Please try again later.";
    }
  };

  const handleSend = async () => {
    if (input.trim() && !isSending) {
      const userMessage = {
        type: 'user',
        text: input,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);

      const userCommand = input.trim().toLowerCase();
      setInput('');
      inputRef.current.focus();

      let response = '';
      if (validCommands.includes(userCommand)) {
        switch (userCommand) {
          case 'help':
            response = "List of valid commands: " + validCommands.join(', ');
            break;
          case 'projects':
            response = `I have several projects in my portfolio.`;
            break;
          case 'work':
            response = `I have worked at multiple companies before.`;
            break;
          case 'publications':
            response = `I have multiple research publications.`;
            break;
          case 'blogs':
            response = `I have multiple blog posts.`;
            break;
          case 'contact':
            response = "My email is at nafisulislam2k2@gmail.com";
            break;
          case 'age':
            response = `I am ${age} years old.`;
            break;
          case 'navigate':
            response = "You can navigate the site by hovering on the navbar to the right on PC, or by clicking on the hamburger menu if you're on mobile.";
            break;
          case 'clear':
            setMessages([]);
            return;
          default:
            break;
        }
        setMessages(prevMessages => [...prevMessages, {
          type: 'response',
          text: response,
          timestamp: new Date().toLocaleTimeString(),
        }]);
      } else {
        setIsSending(true);
        try {
          const apiResponse = await queryAPI(userCommand);
          setMessages(prevMessages => [...prevMessages, {
            type: 'response',
            text: apiResponse,
            timestamp: new Date().toLocaleTimeString(),
          }]);
        } catch (error) {
          console.error('Error sending message:', error);
        } finally {
          setIsSending(false);
        }
      }
    }
  };

  return (
    <PageLayout title="AI Chatbot">
      <div className="bg-transparent text-text flex flex-col p-6 font-montserrat relative pb-20 overflow-hidden" style={{ maxHeight: '70vh' }}>
        {remainingRequests !== null && (
          <div className="absolute top-4 right-4 text-sm text-gray-500">
            Remaining requests today: {remainingRequests}
          </div>
        )}
        <div className="messages-container overflow-y-auto flex-grow mb-4 pr-2">
          {messages.map((message, index) => (
            <div key={index} className={`message-bubble flex items-start gap-2.5 mb-2 ${message.type === 'user' ? 'justify-end' : ''}`}>
              {message.type === 'user' ? (
                <>
                  <div className="flex flex-col gap-1 max-w-lg text-right">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse justify-end">
                      <span className="text-sm font-semibold text-text">You</span>
                      <span className="text-sm font-normal text-gray-500">{message.timestamp}</span>
                    </div>
                    <div className="flex flex-col leading-1.5 p-4 bg-lightblue rounded-l-xl rounded-br-xl">
                      <p className="text-sm font-normal text-background break-words whitespace-pre-wrap">{message.text}</p>
                    </div>
                    <span className="text-sm font-normal text-gray-500">Delivered</span>
                  </div>
                  <FiUser className="w-8 h-8 text-highlight" />
                </>
              ) : (
                <>
                  <FaRobot className="w-8 h-8 text-highlight" />
                  <div className="flex flex-col gap-1 max-w-lg">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-highlight">Bot</span>
                      <span className="text-sm font-normal text-gray-500">{message.timestamp}</span>
                    </div>
                    <div className="flex flex-col leading-1.5 p-4 bg-navbar rounded-r-xl rounded-bl-xl">
                      <p className="text-sm font-normal text-text break-words whitespace-pre-wrap">{message.text}</p>
                    </div>
                    <span className="text-sm font-normal text-gray-500">Delivered</span>
                  </div>
                </>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-11/12 md:w-2/3 lg:w-1/2 p-4 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-grow p-2 border-none rounded-full bg-gray-200 text-background"
            placeholder="Type your message..."
            disabled={isSending}
          />
          <button
            onClick={handleSend}
            className="bg-highlight text-background px-4 py-2 rounded-full ml-2"
            disabled={isSending}
          >
            Send
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Chatbot;