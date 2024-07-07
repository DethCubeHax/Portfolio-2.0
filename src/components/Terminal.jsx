import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';

// Import JSON data
import projectsData from '../data/projects.json';
import workData from '../data/work.json';
import researchData from '../data/research.json';
import blogsData from '../data/blog.json';

// Command component
const Command = ({ commandObj, username, age }) => {
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstRenderedAge, setFirstRenderedAge] = useState(age);

  useEffect(() => {
    // Start the typewriter effect if there's a response to type
    const response =
      commandObj.command === "age"
        ? `I am ${firstRenderedAge} years old.`
        : commandObj.response;

    if (response.length > 0 && currentIndex < response.length) {
      const typingInterval = setTimeout(() => {
        setDisplayedResponse((prevResponse) => prevResponse + response[currentIndex]);
        setCurrentIndex((currentIndex) => currentIndex + 1);
      }, 10); // Change delay to adjust speed of typewriter

      // Cleanup function
      return () => clearTimeout(typingInterval);
    }
  }, [commandObj.command, commandObj.response, currentIndex, firstRenderedAge]);

  useEffect(() => {
    // If the command is not 'age', update the firstRenderedAge
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
      <div className="response">{`> ${displayedResponse}`}</div>
    </div>
  );
};

const Terminal = () => {
  const [username, setUsername] = useState("Terminal");
  const [consoleCommand, setConsoleCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [isUsernameSet, setIsUsernameSet] = useState(false);

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
    }, 2000); // updates every second

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!isUsernameSet) {
        setUsername(consoleCommand);
        setIsUsernameSet(true);
      } else {
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
              // Check if 'age' command is already in command history
              if (commandHistory.some(item => item.command === 'age')) {
                // If it's there, don't add it again
                setConsoleCommand("");
                return;
              }
              // If it's not there, add it
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
        }
        else {
          response = "Sorry, that command does not exist. Try typing 'help' to get a list of valid commands.";
        }
        setCommandHistory([
          ...commandHistory,
          { command: consoleCommand, response: response },
        ]);
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
          <div>Please enter your username:</div>
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
              key={item.command === 'age' ? `age-${age}` : index} // Use 'age' as part of the key for 'age' commands
              commandObj={item}
              username={username}
              age={age}
            />
          ))}
          <div className="input-line">
            <span className="prompt">{username}</span>@<span className="console-name">nafisui-console</span><span className="command-prompt">~#</span>
            <input
              ref={inputRef}
              type="text"
              value={consoleCommand}
              onChange={(e) => setConsoleCommand(e.target.value)}
              onKeyDown={handleCommand}
              className="console-input"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Terminal;