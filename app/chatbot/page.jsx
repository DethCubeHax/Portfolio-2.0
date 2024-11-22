"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FiUser } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import PageLayout from '@/components/PageLayout';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
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
    }, 1000); // Update age every second

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const initialMessage = {
      type: 'response',
      text: `Hello! I am an AI chatbot developed by Nafis, based on his projects, work experiences, and research. I can assist you with various tasks and answer your questions. \n\nHowever, I may occasionally generate incorrect information.\n\nAdditionally, here are some built-in, non-AI commands you can try: ${validCommands.join(', ')}. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const queryAPI = async (queryText, previousMessages) => {
    try {
      const response = await Promise.race([
        fetch('https://green-octopus-24.telebit.io/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query_text: queryText,
            previous_messages: previousMessages,
          })
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 30000)
        )
      ]);

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('API Error:', error);
      return "Oops, looks like my brains are kinda overrun, can you ask something else? Maybe try typing 'help' and seeing some FAQs instead?";
    }
  };

  const handleSend = async () => {
    if (input.trim() && !isSending) {
      const userMessage = {
        type: 'user',
        text: input,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

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
            response = `I have ${projectsData.length} projects.`;
            break;
          case 'work':
            response = `I have worked at ${workData.length} companies before.`;
            break;
          case 'publications':
            response = `I have ${researchData.projects.length} research publication${researchData.projects.length !== 1 ? 's' : ''}.`;
            break;
          case 'blogs':
            response = `I have ${blogsData.length} blog posts.`;
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
        const botMessage = {
          type: 'response',
          text: response,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        setIsSending(true);
        try {
          const previousMessages = messages.map(message => `${message.type === 'user' ? 'Question: ' : 'Answer: '}${message.text}`);
          const apiResponse = await queryAPI(userCommand, previousMessages);
          const botMessage = {
            type: 'response',
            text: apiResponse,
            timestamp: new Date().toLocaleTimeString(),
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
          console.error('Error sending message:', error);
        }
        setIsSending(false);
      }
    }
  };

  return (
    <PageLayout title="AI Chatbot">
      <div className="bg-transparent text-text flex flex-col p-6 font-montserrat relative pb-20 overflow-hidden" style={{ maxHeight: '70vh' }}>
        <div className="messages-container overflow-y-auto flex-grow mb-4 pr-2">
          {messages.map((message, index) => (
            <div key={index} className={`message-bubble flex items-start gap-2.5 mb-2 ${message.type === 'user' ? 'justify-end' : ''}`}>
              {message.type === 'user' ? (
                <>
                  <div className="flex flex-col gap-1 max-w-[500px] text-right">
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
                  <div className="flex flex-col gap-1 max-w-[500px]">
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
