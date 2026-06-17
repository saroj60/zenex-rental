import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Namaste! 🏔️ Where are you planning to go in Nepal? I can help with route planning, vehicle suggestions, and travel tips.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      let botReply = '';
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('mustang') || lowerInput.includes('offroad')) {
        botReply = "For Mustang's rugged terrain, you absolutely need a high-clearance 4x4. I highly recommend our Mahindra Scorpio or Toyota Fortuner. The road from Beni onwards is quite bumpy!";
      } else if (lowerInput.includes('pokhara')) {
        botReply = "Pokhara is beautiful! It's a smooth 6-8 hour drive from Kathmandu. An Economy Car or a standard SUV is perfect. Don't forget to stop at Kurintar for lunch by the river!";
      } else {
        botReply = "That sounds like an amazing adventure! Based on typical routes there, an SUV offers the best balance of comfort and capability. Would you like me to recommend some hotels along the way?";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 sm:bottom-6 right-6 w-14 h-14 bg-himalayan-blue text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-primary transition-transform hover:scale-105 z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 sm:bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-sky-tint flex flex-col overflow-hidden z-50 animate-fade-in h-[500px] max-h-[80vh]">
          {/* Header */}
          <div className="bg-himalayan-blue p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <div>
                <h3 className="font-bold text-sm">Zenex Assistant</h3>
                <p className="text-[10px] text-sky-tint flex items-center gap-1"><Sparkles size={10}/> AI Powered</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-surface-container-low space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-sunset-orange text-white rounded-br-sm' 
                    : 'bg-white border border-sky-tint text-on-surface rounded-bl-sm shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-sky-tint flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about Nepal..." 
              className="flex-1 bg-surface-container-low border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-himalayan-blue"
            />
            <button type="submit" className="w-10 h-10 bg-himalayan-blue text-white rounded-xl flex items-center justify-center hover:bg-primary transition-colors flex-shrink-0">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
