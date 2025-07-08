import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export default function TerminalAuth() {
  const [currentMode, setCurrentMode] = useState('welcome');
  const [currentStep, setCurrentStep] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [currentInput, setCurrentInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const inputRef = useRef(null);

  const loginSteps = [
    { prompt: 'Enter your email:', key: 'email', type: 'email' },
    { prompt: 'Enter your password:', key: 'password', type: 'password' }
  ];

  const signupSteps = [
    { prompt: 'Enter your name:', key: 'name', type: 'text' },
    { prompt: 'Enter your email:', key: 'email', type: 'email' },
    { prompt: 'Enter your password:', key: 'password', type: 'password' },
    { prompt: 'Confirm your password:', key: 'confirmPassword', type: 'password' }
  ];

  const welcomeText = [
    "Welcome to zeroAPI authentication terminal",
    "Type 'login' to sign in or 'signup' to create an account",
    "Type 'clear' to clear the terminal",
    "Type 'help' for available commands",
    "Press Ctrl+C to cancel current operation"
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentMode === 'welcome') {
      setTerminalHistory(welcomeText.map(text => ({ type: 'info', content: text })));
    }
  }, [currentMode]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStep, currentMode]);

  const addToHistory = (type, content) => {
    setTerminalHistory(prev => [...prev, { type, content }]);
  };

  const clearTerminal = () => {
    setTerminalHistory([]);
    setCurrentMode('welcome');
    setCurrentStep(0);
    setCurrentInput('');
    setIsWaitingForInput(false);
    setShowPassword(false);
    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
    setTimeout(() => {
      setTerminalHistory(welcomeText.map(text => ({ type: 'info', content: text })));
    }, 100);
  };

  const cancelOperation = () => {
    addToHistory('info', '^C');
    addToHistory('info', 'Operation cancelled');
    setCurrentMode('welcome');
    setCurrentStep(0);
    setCurrentInput('');
    setIsWaitingForInput(false);
    setShowPassword(false);
    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
  };

  const handleCommand = (command) => {
    const cmd = command.toLowerCase().trim();
    
    addToHistory('command', `user@zeroAPI:~$ ${command}`);
    
    if (cmd === 'clear') {
      setTimeout(clearTerminal, 500);
      return;
    }
    
    if (cmd === 'help') {
      addToHistory('info', 'Available commands:');
      addToHistory('info', '  login    - Start login process');
      addToHistory('info', '  signup   - Start signup process');
      addToHistory('info', '  clear    - Clear terminal');
      addToHistory('info', '  help     - Show this help message');
      addToHistory('info', '  Ctrl+C   - Cancel current operation');
      return;
    }
    
    if (cmd === 'login') {
      setCurrentMode('login');
      setCurrentStep(0);
      setIsWaitingForInput(true);
      addToHistory('info', 'Starting login process...');
      addToHistory('info', 'Press Ctrl+C to cancel at any time');
      setTimeout(() => {
        addToHistory('prompt', loginSteps[0].prompt);
      }, 500);
      return;
    }
    
    if (cmd === 'signup') {
      setCurrentMode('signup');
      setCurrentStep(0);
      setIsWaitingForInput(true);
      addToHistory('info', 'Starting signup process...');
      addToHistory('info', 'Press Ctrl+C to cancel at any time');
      setTimeout(() => {
        addToHistory('prompt', signupSteps[0].prompt);
      }, 500);
      return;
    }
    
    addToHistory('error', `Command not found: ${command}`);
    addToHistory('info', "Type 'help' for available commands");
  };

  const handleFieldInput = (value) => {
    const steps = currentMode === 'login' ? loginSteps : signupSteps;
    const currentField = steps[currentStep];
    
    // Show the input with masked password if it's a password field
    const displayValue = currentField.type === 'password' ? '*'.repeat(value.length) : value;
    addToHistory('input', `${currentField.prompt} ${displayValue}`);
    
    setFormData(prev => ({
      ...prev,
      [currentField.key]: value
    }));
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeout(() => {
        addToHistory('prompt', steps[currentStep + 1].prompt);
      }, 300);
    } else {
      // All fields completed
      setIsWaitingForInput(false);
      setTimeout(() => {
        if (currentMode === 'signup' && formData.password !== value) {
          addToHistory('error', 'Passwords do not match. Please try again.');
          addToHistory('info', "Type 'signup' to restart or 'clear' to start over");
          setCurrentMode('welcome');
          setCurrentStep(0);
          setShowPassword(false);
          setFormData({ email: '', password: '', confirmPassword: '', name: '' });
        } else {
          addToHistory('success', `${currentMode === 'login' ? 'Login' : 'Account creation'} successful!`);
          addToHistory('info', `Welcome${currentMode === 'signup' ? ' to zeroAPI' : ' back'}, ${formData.name || formData.email}!`);
          setCurrentMode('welcome');
          setCurrentStep(0);
          setShowPassword(false);
          setFormData({ email: '', password: '', confirmPassword: '', name: '' });
        }
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    // Handle Ctrl+C
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      if (currentMode !== 'welcome') {
        cancelOperation();
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentInput.trim()) {
        if (currentMode === 'welcome') {
          handleCommand(currentInput);
        } else if (isWaitingForInput) {
          handleFieldInput(currentInput);
        }
        setCurrentInput('');
      }
    }
  };

  const getCurrentInputType = () => {
    if (currentMode === 'welcome') return 'text';
    const steps = currentMode === 'login' ? loginSteps : signupSteps;
    const currentField = steps[currentStep];
    if (currentField?.type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return currentField?.type || 'text';
  };

  const getPromptText = () => {
    if (currentMode === 'welcome') {
      return 'user@zeroAPI:~$';
    }
    const steps = currentMode === 'login' ? loginSteps : signupSteps;
    return steps[currentStep]?.prompt || '';
  };

  const isPasswordField = () => {
    if (currentMode === 'welcome') return false;
    const steps = currentMode === 'login' ? loginSteps : signupSteps;
    return steps[currentStep]?.type === 'password';
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-100 to-gray-100 flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-4xl max-h-[80vh]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal Header */}
        <div className="bg-gray-800 rounded-t-lg p-4 flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="flex-1 text-center">
            <span className="text-gray-300 font-mono text-sm">
              terminal@zeroAPI
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="bg-gray-900 rounded-b-lg p-6 font-mono text-sm h-96 overflow-y-auto">
          {/* Terminal History */}
          <div className="space-y-1 mb-4">
            <AnimatePresence>
              {terminalHistory.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`${
                    entry.type === 'command' ? 'text-green-400' :
                    entry.type === 'error' ? 'text-red-400' :
                    entry.type === 'success' ? 'text-green-400' :
                    entry.type === 'input' ? 'text-blue-400' :
                    entry.type === 'prompt' ? 'text-purple-400' :
                    'text-gray-300'
                  }`}
                >
                  {entry.content}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Current Input Line */}
          <div className="flex items-center text-gray-300">
            <span className="text-green-400 mr-2">
              {currentMode === 'welcome' ? 'user@zeroAPI:~$' : '→'}
            </span>
            {currentMode !== 'welcome' && isWaitingForInput && (
              <span className="text-purple-400 mr-2">
                {getPromptText()}
              </span>
            )}
            <div className="flex-1 flex items-center relative">
              <input
                ref={inputRef}
                type={getCurrentInputType()}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-transparent border-none outline-none text-blue-400 flex-1 pr-8"
                placeholder=""
                autoFocus
              />
              {isPasswordField() && currentInput && (
                <button
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 text-gray-400 hover:text-gray-300 transition-colors"
                  type="button"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              )}
            </div>
            {showCursor && <span className="text-gray-400 animate-pulse ml-1">_</span>}
          </div>

          {/* Control hints */}
          {currentMode !== 'welcome' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-2 text-gray-500 text-xs"
            >
              Press Ctrl+C to cancel
            </motion.div>
          )}

          {/* Help text */}
          {currentMode === 'welcome' && terminalHistory.length === 5 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 text-gray-500 text-xs"
            >
              Hint: Try typing 'login' or 'signup' to get started
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}