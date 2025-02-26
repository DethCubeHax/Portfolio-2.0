"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FiUser } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import PageLayout from '@/components/PageLayout';

const generateRandomString = (length = 12) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);
  const [sessionID] = useState(generateRandomString());

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/user', {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setMessages([{ type: 'response', text: `Hello ${userData.email}! How can I assist you today?`, timestamp: new Date().toLocaleTimeString() }]);
        } else {
          setUser(null);
          setMessages([]);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    const userMessage = { type: 'user', text: input, timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setIsSending(true);
    try {
      const response = await fetch('/query', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'session_id': sessionID
        },
        body: JSON.stringify({ query_text: input })
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { type: 'response', text: data.response, timestamp: new Date().toLocaleTimeString() }]);
      } else {
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      console.error('API Error:', error);
      setMessages(prev => [...prev, { type: 'response', text: 'Something went wrong. Try again.', timestamp: new Date().toLocaleTimeString() }]);
    } finally {
      setIsSending(false);
    }
  };

  const signInWithGoogle = () => {
    window.location.href = '/login';
  };

  const signOut = async () => {
    try {
      await fetch('/logout', { credentials: 'include' });
      setUser(null);
      setMessages([]);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return (
      <PageLayout title="AI Chatbot">
        <div className="min-h-screen flex items-center justify-center">
          <button onClick={signInWithGoogle} className="px-4 py-2 border rounded-lg">
            Login with Google
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="AI Chatbot">
      <div className="flex flex-col p-6 relative pb-20 overflow-hidden" style={{ maxHeight: '70vh' }}>
        <div className="absolute top-4 right-4">
          <button onClick={signOut} className="px-4 py-2 bg-red-500 text-white rounded-lg">Sign Out</button>
        </div>
        <div className="messages-container overflow-y-auto flex-grow mb-4 pr-2">
          {messages.map((message, index) => (
            <div key={index} className={`message-bubble flex items-start gap-2.5 mb-2 ${message.type === 'user' ? 'justify-end' : ''}`}>
              {message.type === 'user' ? (
                <>
                  <div className="flex flex-col gap-1 max-w-lg text-right">
                    <div className="flex items-center space-x-2 justify-end">
                      <span className="text-sm font-semibold">You</span>
                      <span className="text-sm font-normal text-gray-500">{message.timestamp}</span>
                    </div>
                    <div className="p-4 bg-lightblue rounded-l-xl rounded-br-xl">
                      <p className="text-sm text-background break-words">{message.text}</p>
                    </div>
                  </div>
                  <FiUser className="w-8 h-8" />
                </>
              ) : (
                <>
                  <FaRobot className="w-8 h-8" />
                  <div className="flex flex-col gap-1 max-w-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold">Bot</span>
                      <span className="text-sm font-normal text-gray-500">{message.timestamp}</span>
                    </div>
                    <div className="p-4 bg-navbar rounded-r-xl rounded-bl-xl">
                      <p className="text-sm text-text break-words">{message.text}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-11/12 p-4 flex items-center">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} className="flex-grow p-2 bg-gray-200" placeholder="Type your message..." disabled={isSending} />
          <button onClick={handleSend} className="bg-highlight text-background px-4 py-2 ml-2" disabled={isSending}>Send</button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Chatbot;
