'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

const RankBadge = ({ rank }: { rank: string }) => {
  const colors: Record<string, string> = {
    S: 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.5)]',
    A: 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]',
    B: 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]',
    C: 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]',
    D: 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]',
  };

  const colorClass = colors[rank] || 'bg-muted text-muted-foreground';

  return (
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${colorClass}`}
    >
      <span>Rank {rank}</span>
    </motion.div>
  );
};

const MessageContent = ({ content, role }: { content: string; role: string }) => {
  if (role === 'user') return <div className="whitespace-pre-wrap">{content}</div>;

  const rankMatch = content.match(/RANK:\s*([SABCD])/i);
  const rank = rankMatch ? rankMatch[1].toUpperCase() : null;
  const displayContent = rank ? content.replace(/RANK:\s*[SABCD]/i, '').trim() : content;

  return (
    <div className="space-y-3">
      {rank && (
        <div className="mb-1">
          <RankBadge rank={rank} />
        </div>
      )}
      <div className="whitespace-pre-wrap">{displayContent}</div>
    </div>
  );
};

export default function ChatbotPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Hello! I am CodeLens. Paste your code here and I will rank it and review it!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages.filter(m => m.role !== 'system'), userMessage]
        }),
      });
      
      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.message 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Failed to communicate with the server.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col h-screen bg-background text-foreground"
    >
      <motion.header 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className="border-b border-border/40 p-4 flex items-center justify-between backdrop-blur-sm"
      >
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors duration-300">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            CodeLens Chat
          </h1>
        </div>
      </motion.header>

      <motion.main 
        initial={{ opacity: 0, filter: 'blur(8px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl p-4 transition-shadow duration-300 hover:shadow-lg ${
              msg.role === 'user' ? 'bg-primary text-primary-foreground hover:shadow-primary/20' : 'bg-muted text-foreground hover:shadow-accent/10'
            }`}>
              <MessageContent content={msg.content} role={msg.role} />
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-start"
          >
            <div className="max-w-[80%] rounded-2xl p-4 bg-muted text-foreground flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" /> Thinking...
            </div>
          </motion.div>
        )}
      </motion.main>

      <motion.footer 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
        className="border-t border-border/40 p-4"
      >
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            className="flex-1 bg-muted rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow duration-300 hover:shadow-md"
            placeholder="Paste code for ranking..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading} 
            size="icon" 
            className="rounded-full h-12 w-12 shrink-0 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] active:scale-95"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </motion.footer>
    </motion.div>
  );
}
