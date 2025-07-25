import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { MessageCircle, Send, X, User, Bot } from 'lucide-react';

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
  financialData: any;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function ChatBot({ isOpen, onToggle, financialData }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI Finance Assistant. I can help you analyze your expenses, suggest savings, and answer questions about your financial data. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    "How much did I save last month?",
    "Tips to reduce entertainment expenses",
    "What's my biggest spending category?",
    "Am I on track with my savings goal?",
    "Show me my EMI summary",
    "Help me create a budget plan"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('save') && lowerMessage.includes('last month')) {
      const lastMonthIncome = financialData.income[financialData.income.length - 1]?.amount || 0;
      const lastMonthExpense = financialData.expenses[financialData.expenses.length - 1]?.amount || 0;
      const savings = lastMonthIncome - lastMonthExpense;
      return `Last month, you saved ₹${savings.toLocaleString('en-IN')}. This represents ${((savings / lastMonthIncome) * 100).toFixed(1)}% of your income, which is ${savings > 25000 ? 'excellent' : 'good but could be improved'}!`;
    }
    
    if (lowerMessage.includes('entertainment') || lowerMessage.includes('reduce')) {
      return `I noticed you spent ₹8,000 on entertainment this month. Here are some tips to reduce it:
      
      🎬 Use streaming services instead of cinema halls
      💰 Set a monthly entertainment budget of ₹5,000
      🎯 Look for free events and activities in your city
      👥 Split costs when going out with friends
      
      You could potentially save ₹3,000/month this way!`;
    }
    
    if (lowerMessage.includes('biggest') && (lowerMessage.includes('spending') || lowerMessage.includes('category'))) {
      const topCategory = financialData.categoryExpenses.reduce((max: any, cat: any) => 
        cat.amount > max.amount ? cat : max
      );
      return `Your biggest spending category is **${topCategory.category}** at ₹${topCategory.amount.toLocaleString('en-IN')} (${topCategory.percentage}% of total expenses). This seems ${topCategory.percentage > 30 ? 'quite high' : 'reasonable'} for this category.`;
    }
    
    if (lowerMessage.includes('savings goal') || lowerMessage.includes('track')) {
      const goalProgress = (financialData.totalSavings / financialData.savingsGoal * 100).toFixed(1);
      return `You're ${parseFloat(goalProgress) >= 75 ? '🎉 doing great' : '⚠️ behind your target'}! You've achieved ${goalProgress}% of your ₹${financialData.savingsGoal.toLocaleString('en-IN')} savings goal. ${parseFloat(goalProgress) >= 75 ? 'Keep up the excellent work!' : 'Consider increasing your monthly savings by ₹5,000 to get back on track.'}`;
    }
    
    if (lowerMessage.includes('emi') || lowerMessage.includes('loan')) {
      const totalEMI = financialData.emis.reduce((sum: number, emi: any) => sum + emi.amount, 0);
      const overdueCount = financialData.emis.filter((emi: any) => emi.status === 'overdue').length;
      return `📊 **EMI Summary:**
      
      💳 Total Monthly EMI: ₹${totalEMI.toLocaleString('en-IN')}
      ⚠️  Overdue Payments: ${overdueCount}
      📅 Next Due: ${financialData.emis[0]?.name} on ${new Date(financialData.emis[0]?.dueDate).toLocaleDateString('en-GB')}
      
      ${overdueCount > 0 ? '🚨 Please pay your overdue EMIs to avoid penalty charges!' : '✅ All EMIs are up to date!'}`;
    }
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('plan')) {
      return `📋 **Recommended Budget Plan based on your data:**
      
      💰 Income: ₹75,000/month
      🏠 Fixed Expenses (50%): ₹37,500
         • EMI: ₹25,000
         • Bills: ₹12,500
      
      🛒 Variable Expenses (30%): ₹22,500
         • Food: ₹12,000
         • Transport: ₹6,000
         • Others: ₹4,500
      
      💰 Savings (20%): ₹15,000
      
      This follows the 50-30-20 rule and should help you reach your financial goals!`;
    }
    
    // Default responses for common queries
    const defaultResponses = [
      "That's an interesting question! Based on your financial data, I can provide personalized insights. Could you be more specific about what you'd like to know?",
      "I'm here to help you make better financial decisions! You can ask me about your spending patterns, savings goals, or EMI management.",
      "Let me analyze your data... I can help you with budgeting, expense tracking, savings optimization, and much more!"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onToggle}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] flex flex-col">
      <Card className="flex-1 flex flex-col shadow-2xl">
        <CardHeader className="bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span>Smart Finance Assistant</span>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onToggle} className="text-white hover:bg-blue-700">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-blue-100">Online</span>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Sample Prompts */}
          <div className="p-4 border-b bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.slice(0, 3).map((prompt, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50 text-xs"
                  onClick={() => handlePromptClick(prompt)}
                >
                  {prompt}
                </Badge>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' ? 'bg-blue-600' : 'bg-gray-200'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your finances..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}