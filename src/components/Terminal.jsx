import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';

// Import JSON data
import projectsData from '../data/projects.json';
import workData from '../data/work.json';
import researchData from '../data/research.json';
import blogsData from '../data/blog.json';

// Add API query function
const queryAPI = async (queryText) => {
  try {
    const response = await Promise.race([
      fetch('https://green-octopus-24.telebit.io/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query_text: queryText
        })
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 30000)
      )
    ]);

    const data = await response.json();
    console.log('API Response:', data);
    return data.response;
  } catch (error) {
    console.error('API Error:', error);
    return "Oops, looks like my brains are kinda overrun, can you ask something else? Maybe try typing 'help' and seeing some FAQs instead?";
  }
};

// Command component
const Command = ({ commandObj, username, age }) => {
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstRenderedAge, setFirstRenderedAge] = useState(age);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedResponse("");
    setCurrentIndex(0);
    setIsTyping(true);
  }, [commandObj.response]);

  useEffect(() => {
    const response =
      commandObj.command === "age"
        ? `I am ${firstRenderedAge} years old.`
        : commandObj.response;

    if (response.length > 0 && currentIndex < response.length && isTyping) {
      const typingInterval = setTimeout(() => {
        setDisplayedResponse((prevResponse) => prevResponse + response[currentIndex]);
        setCurrentIndex((currentIndex) => currentIndex + 1);
        if (currentIndex === response.length - 1) {
          setIsTyping(false);
        }
      }, 10);

      return () => clearTimeout(typingInterval);
    }
  }, [commandObj.command, commandObj.response, currentIndex, firstRenderedAge, isTyping]);

  useEffect(() => {
    if (commandObj.command !== 'age') {
      setFirstRenderedAge(age);
    }
  }, [commandObj.command, age]);

  return (
    <div className="command-container">
      <div className="command-line">
        <span className="prompt">{username}</span>@<span className="console-name">nafisui-console</span><span className="command-prompt">~#</span>
        <div>{commandObj.command}</div>
      </div>
      <div className="response">
        {`> ${commandObj.response === "Thinking..." ? "Thinking..." : displayedResponse}`}
      </div>
    </div>
  );
};

const Terminal = () => {
  const [username, setUsername] = useState("Terminal");
  const [consoleCommand, setConsoleCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

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
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCommand = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (isWaitingForResponse) {
        return;
      }

      if (!isUsernameSet) {
        setUsername(consoleCommand);
        setIsUsernameSet(true);
        setConsoleCommand("");
        return;
      } 

      let response = "";
      if (validCommands.includes(consoleCommand)) {
        switch (consoleCommand) {
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
            response = `I have ${researchData.projects.length} research publication${researchData.projects.length !== 1 ? 's' : ''}.`
            break;
          case 'blogs':
            response = `I have ${blogsData.length} blog posts.`;
            break;
          case 'contact':
            response = "My email is at nafisulislam2k2@gmail.com";
            break;
          case 'age':
            if (commandHistory.some(item => item.command === 'age')) {
              setConsoleCommand("");
              return;
            }
            response = `I am ${calculateAge()} years old.`;
            break;
          case 'navigate':
            response = "You can navigate the site by hovering on the navbar to the right on PC, or by clicking on the hamburger menu if you're on mobile.";
            break;
          case 'clear':
            setCommandHistory([]);
            setConsoleCommand("");
            return;
          default:
            break;
        }
        setCommandHistory([
          ...commandHistory,
          { command: consoleCommand, response: response },
        ]);
      }
      else {
        setIsWaitingForResponse(true);
        const commandId = Date.now();
        const currentCommand = consoleCommand;
        setConsoleCommand("");
        
        setCommandHistory(prev => [
          ...prev,
          { id: commandId, command: currentCommand, response: "Thinking..." }
        ]);

        try {
          const apiResponse = await queryAPI(currentCommand);
          setCommandHistory(prev => 
            prev.map(cmd => 
              cmd.id === commandId 
                ? { ...cmd, response: apiResponse }
                : cmd
            )
          );
        } finally {
          setIsWaitingForResponse(false);
        }
        return;
      }
      setConsoleCommand("");
    }
  };

  return (
    <div className="terminal">
      <div className="title-bar">
        <div className="title-bar-text">
          {isUsernameSet && `${username}'s Terminal`}
        </div>
        <div className="title-bar-buttons">
          <div className="close-btn"></div>
          <div className="minimize-btn"></div>
          <div className="maximize-btn"></div>
        </div>
      </div>
      {!isUsernameSet ? (
        <div className="username-input">
          <div>Please enter your name:</div>
          <input
            ref={inputRef}
            type="text"
            value={consoleCommand}
            onChange={(e) => setConsoleCommand(e.target.value)}
            onKeyDown={handleCommand}
            className="console-input"
          />
        </div>
      ) : (
        <>
          {commandHistory.map((item, index) => (
            <Command
              key={item.id || (item.command === 'age' ? `age-${age}` : index)}
              commandObj={item}
              username={username}
              age={age}
            />
          ))}
          <div className="input-line" style={{ display: isWaitingForResponse ? 'none' : 'flex' }}>
            <span className="prompt">{username}</span>@<span className="console-name">nafisui-console</span><span className="command-prompt">~#</span>
            <input
              ref={inputRef}
              type="text"
              value={consoleCommand}
              onChange={(e) => setConsoleCommand(e.target.value)}
              onKeyDown={handleCommand}
              className="console-input"
              disabled={isWaitingForResponse}
              style={{ cursor: isWaitingForResponse ? 'not-allowed' : 'text' }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Terminal;