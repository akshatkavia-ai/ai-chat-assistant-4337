import React, { useState, useEffect, useRef } from 'react';
import api from './api';
import './App.css';

/**
 * Main Chat Application Component
 * Provides an elegant chat interface for interacting with the AI Copilot
 * 
 * PUBLIC_INTERFACE
 */
function App() {
  // State management
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ref for auto-scrolling to latest message
  const messagesEndRef = useRef(null);

  /**
   * Scroll to the bottom of the messages area
   * Called when new messages are added
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  /**
   * Handle sending a message to the AI
   * Adds user message to state, calls backend API, and displays assistant response
   * 
   * PUBLIC_INTERFACE
   */
  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Validate input
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) {
      return;
    }

    // Clear any existing errors
    setError(null);

    // Add user message to chat
    const userMessage = { role: 'user', content: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Prepare history for API call
      // Convert messages to format expected by backend: [{role: 'user'|'assistant', content: string}]
      const history = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Call backend API
      const response = await api.post('/api/chat', {
        message: trimmedInput,
        history: history
      });

      // Extract assistant response
      const assistantContent = response.data.response || response.data.message || 'No response received';
      const assistantMessage = { role: 'assistant', content: assistantContent };

      // Add assistant message to chat
      setMessages(prev => [...prev, assistantMessage]);

    } catch (err) {
      console.error('Error sending message:', err);

      // Handle different error types
      let errorMessage = 'Failed to get response from AI. Please try again.';
      
      if (err.response) {
        // Server responded with error
        errorMessage = err.response.data?.detail || err.response.data?.message || errorMessage;
      } else if (err.request) {
        // No response received
        errorMessage = 'Unable to reach the server. Please check your connection.';
      }

      setError(errorMessage);

      // Remove the user message if we got an error
      setMessages(prev => prev.slice(0, -1));
      
      // Restore the input
      setInput(trimmedInput);

    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  /**
   * Handle Enter key press (send message)
   * Shift+Enter for new line
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  /**
   * Close error banner
   */
  const closeError = () => {
    setError(null);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="chat-header">
        <span className="chat-header-icon" role="img" aria-label="AI Robot">🤖</span>
        <h1>AI Copilot</h1>
        <span className="chat-header-subtitle">Powered by Gemini API</span>
      </header>

      {/* Chat Container */}
      <div className="chat-container">
        {/* Error Banner */}
        {error && (
          <div className="error-banner">
            <div className="error-banner-content">
              <span className="error-icon" role="img" aria-label="Error">⚠️</span>
              <span className="error-text">{error}</span>
            </div>
            <button 
              className="error-close" 
              onClick={closeError}
              aria-label="Close error"
            >
              ×
            </button>
          </div>
        )}

        {/* Messages Area */}
        <div className="messages-area">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">💬</div>
              <h2>Welcome to AI Copilot</h2>
              <p>Start a conversation by typing a message below. Your AI assistant is ready to help!</p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  <div className="message-label">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </div>
                  <div className="message-content">
                    {message.content}
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {loading && (
                <div className="message assistant">
                  <div className="message-label">AI Assistant</div>
                  <div className="loading-message">
                    <span>Thinking</span>
                    <div className="loading-dots">
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                      <div className="loading-dot"></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="input-area">
          <div className="input-wrapper">
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
              disabled={loading}
              rows="1"
              aria-label="Message input"
            />
          </div>
          <button 
            type="submit" 
            className="send-button"
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <span className="send-button-text">Send</span>
            <span className="send-button-icon" role="img" aria-label="Send">📤</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
