'use client';
// components/ai-assistant/AIChatInterface.tsx
import { useState, useRef, useEffect } from 'react';

export default function AIChatInterface() {
  const [messages, setMessages] = useState<Array<{sender: string, text: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // For demo, we'll use simple rule-based responses
  const getAIResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('math') || lowerInput.includes('calculate')) {
      return "I can help with math problems. Please provide the specific equation or concept you're struggling with.";
    } else if (lowerInput.includes('science')) {
      return "Science is fascinating! Are you working on biology, chemistry, or physics?";
    } else if (lowerInput.includes('deadline') || lowerInput.includes('due date')) {
      return "According to your schedule, your next assignment is due in 3 days.";
    } else {
      return "I'm your personal learning assistant. How can I help you with your studies today?";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      setMessages([...newMessages, { sender: 'ai', text: aiResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="ai-chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message ai">Thinking...</div>}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask your AI assistant..."
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
}